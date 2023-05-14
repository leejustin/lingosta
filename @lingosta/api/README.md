# Lingosta API
NodeJS serverless APIs deployed to Vercel.

## Prerequisites
1. [Install Vercel CLI](https://vercel.com/docs/concepts/functions/serverless-functions/quickstart):
   
   ```bash
   npm i -g vercel@latest
   ```
1. Set up `.env` file in `@lingosta/` if you haven't done so yet. This is needed for application configurations to be loaded.

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```

1. Run the development server in the `@lingosta/` root directory:
   ```bash
   vercel dev
   ```
    This will start the server at `http://localhost:3000`

## API Specification
### Query for translations
#### Request
`POST` `{BASE_URL}/api/translations`

Implements `@lingosta/common/TranslationRequest`

 ```json
 {
     "language": "es",
     "sentence": "tengo muchos amigos"
 }
 ```

#### Response
Successful Status Code: `200`

Implements `@lingosta/common/Translation`
   ```json
   {
     "type": "es",
     "sentence": "tengo muchos amigos",
     "terms": [
       {
         "source": "tengo",
         "target": "I have",
         "weight": 0.8
       },
       {
         "source": "muchos",
         "target": "many",
         "weight": 0.7
       },
       {
         "source": "amigos",
         "target": "friends",
         "weight": 0.9
       }
     ]
   }
   ```
#### Sample
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "language": "es",
  "sentence": "tengo muchos amigos"
}' {BASE_URL}/api/translations
```
