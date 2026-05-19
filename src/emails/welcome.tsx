import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  brand: string;
  verifyUrl?: string;
}

export default function WelcomeEmail({ name, brand, verifyUrl }: WelcomeEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Bienvenue chez {brand}</Preview>
      <Body style={{ backgroundColor: "#fafaf8", fontFamily: "Inter, system-ui, sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "40px 24px", maxWidth: 560 }}>
          <Heading style={{ fontSize: 28, color: "#0a0a0a", margin: "0 0 24px" }}>
            Bienvenue {name}
          </Heading>
          <Section>
            <Text style={{ fontSize: 16, lineHeight: 1.6, color: "#0a0a0a" }}>
              Merci d'avoir créé un compte sur {brand}. Nous sommes ravis de vous compter parmi nous.
            </Text>
            {verifyUrl ? (
              <Text style={{ fontSize: 16, lineHeight: 1.6, color: "#0a0a0a", marginTop: 24 }}>
                Pour activer votre compte, cliquez sur le lien suivant :{" "}
                <Link href={verifyUrl} style={{ color: "#8c5a3c" }}>
                  Activer mon compte
                </Link>
              </Text>
            ) : null}
          </Section>
          <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 40 }}>
            Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer ce message.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
