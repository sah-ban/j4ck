export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header: "eyJmaWQiOjI2ODQzOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDIxODA4RUUzMjBlREY2NGMwMTlBNmJiMEY3RTRiRkIzZDYyRjA2RWMifQ",
      payload: "eyJkb21haW4iOiJqNGNrLnZlcmNlbC5hcHAifQ",
      signature:"MHg2NDliYmQ4YmU4ZGE3YTg2YzQxMDYzZjI2MzgzOTY2NTFjOWM1ZGJjNzg0ZTFmNWI3YmFiNzdlNjYzYzc3NzI0NTMwZDMwNmZmMzg4YWQ5ZWNjMjZlOTBkZjYxZjZhMzU0Mzc5ZTQyYmRkZDJhNjdkYTBhMWZjZTBkMmI1YTA5YjFi"
    },
    frame: {
      version: "1",
      name: "j4ck",
      iconUrl: `https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3b82cfba-7d62-43ad-f752-1643db239b00/original`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/opengraph-image`,
      buttonTitle: "open",
      splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,
      splashBackgroundColor: "#333333",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
