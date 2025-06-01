export async function sendMessage(customerName, customerId, message, campaignId) {
  const success = Math.random() < 0.9;
  const status = success ? 'SENT' : 'FAILED';

  await new Promise((resolve) => {
    setTimeout(async () => {
      try {
        await fetch('http://localhost:8080/api/v1/deliveryReceipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId, campaignId, status }),
        });
      } catch (error) {
        console.error('Fetch error in sendMessage:', error);
      }
      resolve(); // ensure promise completes
    }, 10000);
  });

  return status;
}