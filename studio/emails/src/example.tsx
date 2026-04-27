import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface SampleProps {
  recipientName: string;
  body: string;
  senderName: string;
  senderCompany: string;
}

export default function Sample({
  recipientName = "Alex Morgan",
  body = "Hello,\n\nThis is a sample email.",
  senderName = "Taylor Lee",
  senderCompany = "Acme Inc.",
}: SampleProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{`Message for ${recipientName}`}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-8 max-w-[600px] bg-white p-8">
            <Section>
              <Text className="text-base leading-7 text-gray-800">
                {recipientName}
              </Text>
              <Text className="text-base leading-7 text-gray-800">
                {body}
              </Text>
              <Hr className="my-6 border-gray-200" />
              <Text className="text-sm leading-6 text-gray-500">
                {senderName}
                <br />
                {senderCompany}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
