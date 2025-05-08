import { createClient } from '@sanity/client'

const SAMPLE_TYPE = 'samples'
const SAMPLE_DESCRIPTION = 'This sample was created by GitHub Actions!\r\nReplace this with a description of your sample.'
const SAMPLE_SUBTITLE = 'This sample was created by GitHub Actions!\r\nReplace this with a subtitle of your sample.'
const PRODUCT_TITLE = 'WebViewer SDK'
const PRODUCT_ID = '6a33d9f7-3e70-4012-a6ad-51ea7ea18b8d' //process.env.SANITY_SAMPLES_WEBVIEWER_SDK_ID
const PRODUCT_NAME = 'product'
const PRODUCT_TYPE = 'reference'
const CODE_LANGUAGE = 'javascript'
const CODE_LANGUAGE_TITLE = 'JavaScript'
const CODE_BLOCK = 'This sample was created by GitHub Actions!\r\nReplace this with a code block of your sample.'

const client = createClient({
  projectId: 'e72qwn7x', //process.env.SANITY_PROJECT_ID,
  dataset: 'staging', //process.env.SANITY_DATASET,
  apiVersion: '2025-02-06', // Latest API version
  token: 'skEb8b2woq9bqoDeUC5AcljAvA05kUsQnLzJYIrS37Dsum8lWELK34boAuOpNlHPRdNIYdGCkdrliGJyvfYCzcOaaDaXcAcEVTxqlqkmPLFpabOjxK6XCCwsunO0sdYa7ZPigFBk6QxsnnyvVKCZezo7P2dePkAAlaOGMAV4A7E9CePkaCCz',
  //'process.env.SANITY_API_TOKEN,
  useCdn: false
});

async function fetchSamples() {
  await client.fetch(`*[_type == "${SAMPLE_TYPE}" && product->title == "${PRODUCT_TITLE}"] {_id,_type,title,subtitle,product,tabbedCodeBlock {languages[] {language->{title,name},code,}}}`).then((pages) => {
    console.log(`Total number of samples in product ${PRODUCT_TITLE}: ${pages.length}.`)
    pages.forEach((page) => {
      console.log(`Page title: ${page.title}`)
      console.log(`Page ID: ${page._id}`)
      console.log(`Page type: ${page._type}`)
      console.log(`Page subtitle: ${page.subtitle}`)
      console.log()
      console.log(`Product type: ${page.product._type}`)
      console.log(`Product reference: ${page.product._ref}`)
      console.log()
      if (page.tabbedCodeBlock) {
        console.log(`Code Language: ${page.tabbedCodeBlock.languages[0].language.name}`)
        console.log(`Code Language Title: ${page.tabbedCodeBlock.languages[0].language.title}`)
        console.log(`Code: ${page.tabbedCodeBlock.languages[0].code}`)
      }
      else
        console.log(`Page does not exist`)
      console.log()
    })
  })
}

//fetchSamples();

// In case a new sample is added to 
// master unified webviewer-samples
// and doesn't have a page in Sanity
async function createDocument(sampleName) {
  try {
    const page = {
      _type: SAMPLE_TYPE,
      title: sampleName,
      name: sampleName,
      subtitle: SAMPLE_SUBTITLE,
      description: SAMPLE_DESCRIPTION,
      product: {
        name: PRODUCT_NAME,
        title: 'Product',
        type: PRODUCT_TYPE,
        //_id: PRODUCT_ID //process.env.SANITY_SAMPLES_WEBVIEWER_SDK_ID
      },
      tabbedCodeBlock: {
        languages: [
          {
            name: CODE_LANGUAGE,
            title: CODE_LANGUAGE_TITLE,
            subtitle: CODE_BLOCK_SUBTITLE,
          }
        ]
      },
      createdAt: new Date().toISOString()
    };

    const response = await client.create(page);
    console.log('Page created successfully:', response);
  } catch (error) {
    console.error('Error creating page:', error);
  }
}

// In case the sample is already exist under master unified webviewer-samples
async function updateDocument(sampleName) {

}

async function SamplesToSanity(sampleName) {

  // Check for the sample page existence
  const pages = await client.fetch(`*[_type == "${SAMPLE_TYPE}" && product->title == "${PRODUCT_TITLE}" && title match "${sampleName}"]`)

  // If page doesn't exist, create it
  if (pages.length == 0)
    createDocument(sampleName)
  // the page is already exist, update it
  else
    updateDocument(sampleName)
    
}

SamplesToSanity('webviewer-react');