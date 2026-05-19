import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface ContactNotificationProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  typePrestation: string;
  typeBatiment: string;
  surface?: number;
  message: string;
}

export default function ContactNotificationEmail({
  name,
  email,
  phone,
  address,
  typePrestation,
  typeBatiment,
  surface,
  message,
}: ContactNotificationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>
        Demande de devis — {typePrestation} — {name}
      </Preview>
      <Body
        style={{
          backgroundColor: "#f3f1ec",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            margin: "0 auto",
            padding: "32px 24px",
            maxWidth: 600,
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#061a2e",
              color: "#f3f1ec",
              padding: "28px 32px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: 2,
                color: "#f4b400",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Nouvelle demande · Alti&apos; Drone &amp; Services
            </Text>
            <Heading
              style={{
                margin: "8px 0 0",
                fontSize: 22,
                color: "#ffffff",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Demande de devis : {typePrestation}
            </Heading>
          </Section>

          {/* Body */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "32px",
              borderRadius: "0 0 12px 12px",
              border: "1px solid #e8e3d8",
              borderTop: "none",
            }}
          >
            <Row label="Nom" value={name} />
            <Row label="Email" value={email} />
            <Row label="Téléphone" value={phone} />
            <Row label="Adresse du bâtiment" value={address} />
            <Hr style={{ borderColor: "#ebe7df", margin: "16px 0" }} />
            <Row label="Type de prestation" value={typePrestation} />
            <Row label="Type de bâtiment" value={typeBatiment} />
            {typeof surface === "number" ? (
              <Row label="Surface estimée" value={`${surface} m²`} />
            ) : null}
            <Hr style={{ borderColor: "#ebe7df", margin: "20px 0 16px" }} />

            <Text
              style={{
                margin: "0 0 8px",
                fontSize: 11,
                color: "#5b6776",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontWeight: 600,
              }}
            >
              Message
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: 15,
                color: "#050b13",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
              }}
            >
              {message}
            </Text>

            <Section style={{ marginTop: 28 }}>
              <Button
                href={`mailto:${email}?subject=Devis%20Alti'%20Drone%20%26%20Services%20—%20${encodeURIComponent(typePrestation)}`}
                style={{
                  backgroundColor: "#f4b400",
                  color: "#061a2e",
                  padding: "12px 24px",
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Répondre à {name}
              </Button>
            </Section>
          </Section>

          <Text
            style={{
              fontSize: 12,
              color: "#5b6776",
              textAlign: "center",
              margin: "16px 0 0",
            }}
          >
            Email envoyé automatiquement depuis altidroneservices.fr
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <Text
        style={{
          margin: 0,
          fontSize: 11,
          color: "#5b6776",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: 600,
        }}
      >
        {label}
      </Text>
      <Text style={{ margin: "2px 0 0", fontSize: 15, color: "#050b13" }}>
        {value}
      </Text>
    </div>
  );
}
