#!/bin/bash

# Sets up the schema for Appwrite sessions collection

DATABASE_ID=$APPWRITE_DATABASE_ID
SESSIONS_COLLECTION_ID=$APPWRITE_COLLECTION_SESSIONS

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key group_id \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key owner_id \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key source_translations \
--size 75 \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key target_translations \
--size 75 \
--required true \
--array true

appwrite databases createFloatAttribute --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key translation_weights \
--required true \
--array true

appwrite databases createIntegerAttribute --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key progress \
--required true \
--array true

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key owner_id_idx \
--type key \
--attributes owner_id

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $SESSIONS_COLLECTION_ID \
--key group_id_idx \
--type key \
--attributes group_id
