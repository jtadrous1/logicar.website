const admin = require('firebase-admin');
admin.initializeApp();

const updateExistingSignups = async () => {
  const db = admin.firestore();
  const signupsRef = db.collection('signups');
  
  // Get all existing signups
  const snapshot = await signupsRef.get();
  
  // Prepare batch updates (batches of 500 to stay within Firestore limits)
  let batch = db.batch();
  let operationCount = 0;
  const batchSize = 500;
  
  console.log(`Found ${snapshot.size} signups to update.`);
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    
    // Skip if normalizedEmail already exists
    if (data.normalizedEmail) continue;
    
    // Add normalizedEmail field
    if (data.email) {
      const normalizedEmail = data.email.toLowerCase().trim();
      batch.update(doc.ref, { normalizedEmail });
      operationCount++;
      
      // Commit batch when it reaches the batch size
      if (operationCount >= batchSize) {
        await batch.commit();
        batch = db.batch();
        operationCount = 0;
        console.log(`Processed ${operationCount} updates.`);
      }
    }
  }
  
  // Commit any remaining updates
  if (operationCount > 0) {
    await batch.commit();
    console.log(`Processed final batch of ${operationCount} updates.`);
  }
  
  console.log('Update complete!');
};

// Execute the function
updateExistingSignups()
  .then(() => {
    console.log('Successfully updated existing signups.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error updating signups:', error);
    process.exit(1);
  }); 