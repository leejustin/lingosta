#!/bin/bash

# Sets up the schema for Appwrite translations collection

DATABASE_ID=$APPWRITE_DATABASE_ID
TRANSLATIONS_COLLECTION_ID=$APPWRITE_COLLECTION_TRANSLATIONS

SUPPORTED_LANGUAGES="en es fr de it pt nl ru zh ja ko"

## Translations Collection
appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key owner_id \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key group_id \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key source_translations \
--size 75 \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key target_translations \
--size 75 \
--required true \
--array true

appwrite databases createFloatAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key translation_weights \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key raw_data \
--size 300 \
--required true

appwrite databases createEnumAttribute --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key source_language \
--elements $SUPPORTED_LANGUAGES \
--required true

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key source_language_idx \
--type key \
--attributes source_language

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key owner_id_idx \
--type key \
--attributes owner_id

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $TRANSLATIONS_COLLECTION_ID \
--key group_id_idx \
--type key \
--attributes group_id

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $GROUPS_COLLECTION_ID \
--key group_id_owner_id_idx \
--type key \
--attributes owner_id group_id
