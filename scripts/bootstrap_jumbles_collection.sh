#!/bin/bash

# Sets up the schema for Appwrite jumbles collection

DATABASE_ID=$APPWRITE_DATABASE_ID
JUMBLES_COLLECTION_ID=$APPWRITE_COLLECTION_JUMBLES

## Jumbles Collection
appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key owner_id \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key source_group_ids \
--size 36 \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key process_id \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key answer \
--size 75 \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key prompt \
--size 75 \
--required true \
--array true

appwrite databases createFloatAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key translation_weights \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key options \
--size 75 \
--required true \
--array true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key is_reversed \
--size 75 \
--required true \
--default false

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key owner_id_idx \
--type key \
--attributes owner_id

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key source_group_ids_idx \
--type key \
--attributes source_group_ids

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $JUMBLES_COLLECTION_ID \
--key process_id_idx \
--type key \
--attributes process_id
