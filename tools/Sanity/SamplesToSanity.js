const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-04-29', // Latest API version
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});


async function fetchDocuments() {
  const query = `*[_type == "post"]`; // Replace "post" with your document type
  const posts = await client.fetch(query);
  console.log(posts);
}
  
fetchDocuments();
  

// In case a new sample is added to master unified webviewer-samples
/*async function createDocument(sampleName) {
  try {
    const newDoc = {
      _type: 'Document', // Replace with your schema type
      title: sampleName,
      description: 'This sample was created by GitHub Actions!',
      createdAt: new Date().toISOString()
    };

    const response = await client.create(newDoc);
    console.log('Document created successfully:', response);
  } catch (error) {
    console.error('Error creating document:', error);
  }
}*/

// In case the sample is already exist under master unified webviewer-samples
async function updateDocument(/* sampleName */) {
}

function SamplesToSanity() {

  // Check if the document doesn't exist, create it
  //createDocument("webviewer-react");

  // Check if the document already exists, update it
  //updateDocument(/* sampleName */);
}

//SamplesToSanity();