// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-3.5-turbo-0125",
//   messages: [
//     {"role": "system", "content": "You are a helpful assistant."},
//     {"role": "user", "content": "What is human life expectancy in the United States?"},
//     {"role": "system", "content": "78 years."},
//     {"role": "user", "content": "What is the capital of the United States?"},
//     {"role": "system", "content": "Washington, D.C."},
//     {"role": "user", "content": "What is the square root of banana?"},
//     {"role": "system", "content": "I'm not sure what you're asking."},
//   ],
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));



// import { GoogleGenerativeAI } from "@google/generative-ai";
// // const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyAVVb0O5cem5VgL1jcmZbi_OHpuFW_DhSw");
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());





import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  FileState,
  GoogleAICacheManager,
  GoogleAIFileManager,
} from '@google/generative-ai/server';

// A helper function that uploads the video to be cached.
async function uploadMp4Video(filePath, displayName) {
  const fileManager = new GoogleAIFileManager("AIzaSyAVVb0O5cem5VgL1jcmZbi_OHpuFW_DhSw");
  const fileResult = await fileManager.uploadFile(filePath, {
    displayName,
    mimeType: 'video/mp4',
  });

  const { name, uri } = fileResult.file;

  // Poll getFile() on a set interval (2 seconds here) to check file state.
  let file = await fileManager.getFile(name);
  while (file.state === FileState.PROCESSING) {
    console.log('Waiting for video to be processed.');
    // Sleep for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    file = await fileManager.getFile(name);
  }

  console.log(`Video processing complete: ${uri}`);

  return fileResult;
}

// Download video file
// curl -O https://storage.googleapis.com/generativeai-downloads/data/Sherlock_Jr_FullMovie.mp4
const pathToVideoFile = "C:/Users/User/Desktop/4th Sem ACA 22/Thermodynamics of Heat and Work Transfer Devices/Videos/Laws of Thermodynamics/ME2842 -Laws of Thermodynamics - Intro.mp4";

// Upload the video.
const fileResult = await uploadMp4Video(pathToVideoFile, 'Sherlock Jr. video');

// Construct a GoogleAICacheManager using your API key.
const cacheManager = new GoogleAICacheManager("AIzaSyAVVb0O5cem5VgL1jcmZbi_OHpuFW_DhSw");

// Create a cache with a 5 minute TTL.
const displayName = 'sherlock jr movie';
const model = 'models/gemini-1.5-flash-001';
const systemInstruction =
  'You are an expert video analyzer, and your job is to answer ' +
  "the user's query based on the video file you have access to.";
let ttlSeconds = 300;
const cache = await cacheManager.create({
  model,
  displayName,
  systemInstruction,
  contents: [
    {
      role: 'user',
      parts: [
        {
          fileData: {
            mimeType: fileResult.file.mimeType,
            fileUri: fileResult.file.uri,
          },
        },
      ],
    },
  ],
  ttlSeconds,
});

// Get your API key from https://aistudio.google.com/app/apikey
// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI("AIzaSyAVVb0O5cem5VgL1jcmZbi_OHpuFW_DhSw");

// Construct a `GenerativeModel` which uses the cache object.
const genModel = genAI.getGenerativeModelFromCachedContent(cache);

// Query the model.
const result = await genModel.generateContent({
  contents: [
    {
      role: 'user',
      parts: [
        {
          text:
            'Introduce different characters in the movie by describing ' +
            'their personality, looks, and names. Also list the ' +
            'timestamps they were introduced for the first time.',
        },
      ],
    },
  ],
});

console.log(result.response.usageMetadata);

// The output should look something like this:
//
// {
//   promptTokenCount: 696220,
//   candidatesTokenCount: 270,
//   totalTokenCount: 696490,
//   cachedContentTokenCount: 696191
// }

console.log(result.response.text());



// const mysql = require('mysql');
// const Gemini = require('gemini');

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: 'your-database-host',
//   user: 'your-database-username',
//   password: 'your-database-password',
//   database: 'your-database-name'
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database');
  
//   // Query the database
//   connection.query('SELECT * FROM your_table_name', (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return;
//     }
    
//     // Analyze the data using Gemini
//     const gemini = new Gemini();
//     gemini.load(results);
    
//     // Perform some analysis
//     const summary = gemini.summarize();
//     console.log('Data Summary:', summary);
    
//     // Close the database connection
//     connection.end();
//   });
// });
