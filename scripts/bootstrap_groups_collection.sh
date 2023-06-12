#!/bin/bash

# Sets up the schema for Appwrite groups collection

DATABASE_ID=$APPWRITE_DATABASE_ID
GROUPS_COLLECTION_ID=$APPWRITE_COLLECTION_GROUPS

SUPPORTED_LANGUAGES="en es fr de it pt nl ru zh ja ko"

## Groups Collection
appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $GROUPS_COLLECTION_ID \
--key name \
--size 36 \
--required true

appwrite databases createStringAttribute --databaseId $DATABASE_ID --collectionId $GROUPS_COLLECTION_ID \
--key owner_id \
--size 36 \
--required true

appwrite databases createEnumAttribute --databaseId $DATABASE_ID --collectionId $GROUPS_COLLECTION_ID \
--key language \
--elements $SUPPORTED_LANGUAGES \
--required true

appwrite databases createIndex --databaseId $DATABASE_ID --databaseId $DATABASE_ID --collectionId $GROUPS_COLLECTION_ID \
--key owner_id_idx \
--type key \
--attributes owner_id
