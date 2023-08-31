const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
var in_a = require('in-a-nutshell');
const { translate } = require('free-translate');

const mongoURI = 'mongodb+srv://jg581261:tubeligh@jagbirsingh.awpqywe.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'news360'; // Replace with your desired database name
const collectionName = 'multiLingual'; // Replace with your desired collection name

const categories = ['politics', 'entertainment','technology','economics','education','health','science','sports','art', 'lifestyle','culture'];
const pageSize = 5;
var spanishContent = "";
var frenchContent = "";

async function fetchArticlesForCategory(category) {
    try {
        // Fetch data from the API using Axios for the specified category
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${category}&pageSize=${pageSize}&language=en&apiKey=b83f637fa5254462896242e89489f3b9`);
        const articles = response.data.articles;

        // Array to store matched articles
        const matchedArticles = [];

        // Save each article to MongoDB
        for (const article of articles) {
            // Fetch content from the URL using Cheerio
            const urlResponse = await axios.get(article.url);
            const contentFromURL = urlResponse.data;
            const $ = cheerio.load(contentFromURL);

            // Extract all content within <p> tags
            const paragraphs = [];
            $('p').each((index, element) => {
                const paragraphText = $(element).text().trim();
                if (paragraphText!==""||paragraphText!==null) {
                    paragraphs.push(paragraphText);
                }
            });

            const paragraphString = paragraphs.join(' ');
            try {
                var summary = in_a.nutshell(paragraphString, 5);
                spanishContent = await translate(summary, { to: 'es' });
                frenchContent = await translate(summary, { to: 'fr' });
            }catch (e) {
                summary = "The data was too short or had a paywall or a subscription blocker that did not allow us to retrieve the data, please use the article link to view the complete article. We are sorry for the inconvenience caused.";
                spanishContent = await translate(summary, { to: 'es' });
                frenchContent = await translate(summary, { to: 'fr' });
            }

            // Check if any paragraphs were found
            if (paragraphs.length > 0) {
                // Store the matched article details in an object
                const matchedArticleData = {
                    title: article.title,
                    description: article.description,
                    category: category,
                    newsUrl: article.url,
                    content: summary,
                    content_es: spanishContent,
                    content_fr: frenchContent,
                    imageUrl: article.urlToImage
                };
                // Push the matched article object to the array
                matchedArticles.push(matchedArticleData);
            }
        }

        return matchedArticles;

    } catch (error) {
        console.error(`Error fetching data for category ${category}:`, error);
        return [];
    }
}

async function main() {
    try {
        // Array to store all matched articles from all categories
        const allMatchedArticles = [];

        // Loop through each category and fetch data
        for (const category of categories) {
            console.log(`Loading ${category} news`);
            var matchedArticlesForCategory = await fetchArticlesForCategory(category);
            allMatchedArticles.push(...matchedArticlesForCategory);
        }

        // Connect to MongoDB
        const client = await MongoClient.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Access the database
        const db = client.db(dbName);

        // Access the collection
        const collection = db.collection(collectionName);

        if(allMatchedArticles.length > 0) {
            await collection.insertMany(allMatchedArticles);
            client.close();
            console.log('Data stored in MongoDB.');
        }else{
            client.close();
            console.log('There was no data to be stored');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

main();