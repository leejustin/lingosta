# Lingosta Common
Package containing shared code used between the frontend and the backend.

These will be mostly data models and associated utilities.

## Setup
Your application will expect a `@lingosta/common/dist` directory. This is set up by building the source.

### Prerequisites
```bash
npm install -g typescript
```

### Build
In `@lingosta/common/`, run the following:
```bash
npm run build
```
<<<<<<< HEAD
=======

## Structure
Currently, this package organizes code with the following conventions:
- `*.api.ts` - handling API models (request, response, serialization)
- `*.db.ts` - handling Appwrite models (request, response, serialization)
- Others are intended to be generic models and utils to be used app-wide

### Usage
#### API Translations
To query for data against the translation API, you will need to prepare a `TranslationRequest` object. Once successful, it will return a `TranslationResponse` object. Once you have a `TranslationResponse`, you should map the result into a `UserTranslation` object that encapsulates more metadata about the translation itself.

Internally in the translation API, when the request is successful, it deserializes the response from a `RawTranslationResponse` object into a `TranslationResponse` object. This is needed to format the response into something that's more usable in our application. This is due to a few factors (such as reducing JSON payload size) in the downstream API.

#### Collection `translations`
Appwrite data stored in `translations` needs to be serialized/deserialized due to how Appwrite stores its data internally. Serialization helps make the complex data more usable with a nested JSON representation.
- Data returned by Appwrite: type the response as a `DBTranslation` object. This allows you to use custom-defined fields as well as Appwrite-internal fields such as `$id`.
- Data passed into Appwrite: use the `DBTranslationFields` interface. This allows you to decouple custom-defined fields from Appwrite-internal fields. If you try to pass in `$id` into a document creation/update, Appwrite will complain.

#### Collection `groups`
Appwrite data stored in `groups` is straightforward and can be used as-is. However, we still use the mapping convention to maintain consistency between our models and how they're used.

- Data returned by Appwrite: type the response as a `DBGroup` object. This allows you to use custom-defined fields as well as Appwrite-internal fields such as `$id`.
- Data passed into Appwrite: use the `DBGroupFields` interface. This allows you to decouple custom-defined fields from Appwrite-internal fields. If you try to pass in `$id` into a document creation/update, Appwrite will complain.

>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
