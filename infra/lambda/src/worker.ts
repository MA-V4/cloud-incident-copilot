import { SQSEvent, SQSRecord } from 'aws-lambda'; // Currently just a base test file
import { AppEvent } from '@cic/types'; //nEED TO IMPLEMENT MODULES 

/**
 * Lambda worker — triggered by SQS events.
 * Processes each record: normalises payload and stores in DynamoDB.
 *
 * TODO Phase 3:
 *  - implement normaliseEvent()
 *  - implement storeEvent() with DynamoDB PutCommand
 *  - implement detectIncidents() in Phase 4
 */

export const handler = async (event: SQSEvent): Promise<void> => {
  console.log(`Processing ${event.Records.length} record(s)`);

  for (const record of event.Records) {
    try {
      await processRecord(record);
    } catch (err) {
      console.error('Failed to process record:', record.messageId, err);
      // Rethrowing causes SQS to send the record to the dead-letter queue
      throw err;
    }
  }
};

async function processRecord(record: SQSRecord): Promise<void> {
  const raw = JSON.parse(record.body) as AppEvent;
  console.log('Received event:', raw.type, raw.service);

  // TODO Phase 3: normalise and store
  // const normalised = normaliseEvent(raw);
  // await storeEvent(normalised);

  // TODO Phase 4: run incident detection
  // await detectIncidents(normalised);
}
