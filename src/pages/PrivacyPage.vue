<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, organizationLd } from '@/seo/jsonld'
import { PRIVACY_PATH } from '@/seo/site'

/**
 * Public legal copy — static and sector-generic on purpose (this page is
 * public, so it cannot depend on a tenant's `customer_type`). Copied from
 * edviro-dashboard/src/components/PrivacyPolicy.tsx. Wording changes here
 * should be reviewed by counsel and the "Last updated" date bumped when the
 * revised policy is published.
 */
type PolicyTab = 'mobile-app' | 'dashboard'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Privacy policy', path: PRIVACY_PATH },
]

const tab = ref<PolicyTab>('mobile-app')

usePageSeo({
  title: 'Privacy Policy',
  description:
    'How Edviro collects, uses, shares, and protects information in the mobile app, website, and dashboard — including PG&E Share My Data access and your CCPA rights.',
  path: PRIVACY_PATH,
  jsonLd: [organizationLd(), breadcrumbLd(breadcrumbs)],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <section style="padding: 40px 32px 24px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Legal</p>
        <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">Privacy Policy</h1>
        <p style="margin: 18px 0 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Last updated: September 15, 2026</p>
      </div>
    </section>

    <section style="padding: 0 32px 100px;">
      <div class="policy" style="max-width: 820px; margin: 0 auto; width: 100%;">
        <div class="tabs" role="tablist" aria-label="Privacy policy">
          <button
            type="button"
            role="tab"
            id="tab-mobile-app"
            class="tab"
            :class="{ 'is-active': tab === 'mobile-app' }"
            :aria-selected="tab === 'mobile-app'"
            aria-controls="panel-mobile-app"
            @click="tab = 'mobile-app'"
          >
            Mobile App
          </button>
          <button
            type="button"
            role="tab"
            id="tab-dashboard"
            class="tab"
            :class="{ 'is-active': tab === 'dashboard' }"
            :aria-selected="tab === 'dashboard'"
            aria-controls="panel-dashboard"
            @click="tab = 'dashboard'"
          >
            Website &amp; Dashboard
          </button>
        </div>

        <div
          v-show="tab === 'mobile-app'"
          id="panel-mobile-app"
          role="tabpanel"
          aria-labelledby="tab-mobile-app"
        >
          <section>
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy describes how Edviro ("Edviro," "we," "us," or "our") collects, uses, shares, and protects information when authorized users access the Edviro mobile application.
            </p>
            <p>
              The Edviro app is designed for facilities, operations, and administrative teams at the organizations we serve (such as school districts and other multi-site facility operators) to review energy usage, utility billing insights, sustainability goals, facility assets, anomaly tracking, savings reports, and AI-assisted operational guidance. This policy is intended to support Apple's App Store privacy requirements by explaining the categories of data the app may collect, whether that data is linked to a user, how it is used, and whether it is used for tracking.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We collect only the information needed to provide and secure the Edviro app and related services.</p>

            <h3>Account and Contact Information</h3>
            <ul>
              <li>Name, email address, organization, account role, and login credentials or authentication tokens.</li>
              <li>Administrative information needed to associate an authorized user with the correct organization, sites, and facilities.</li>
              <li>Support request information that you choose to provide when contacting us.</li>
            </ul>

            <h3>Site, Facility, Asset, and Utility Information</h3>
            <ul>
              <li>Organization and site names, facility information, meter names, utility account references, energy consumption, demand, emissions estimates, billing history, and sustainability goal data.</li>
              <li>Facility asset details such as equipment names, locations within a site or floor plan, notes, nameplate fields, known issues, and operational metadata entered or reviewed by authorized users.</li>
              <li>Floor-plan or map placement coordinates for assets and meters. These are facility map coordinates, not device GPS coordinates.</li>
            </ul>

            <h3>User Content, Photos, and AI Interactions</h3>
            <ul>
              <li>Photos selected from your photo library or captured with your camera when you choose to attach images to facility assets.</li>
              <li>Equipment nameplate images submitted for extraction, so the app can identify and prefill equipment fields.</li>
              <li>Free-form text, prompts, confirmations, and responses submitted through the AI assistant or asset workflows.</li>
            </ul>

            <h3>Usage, Diagnostics, and Security Information</h3>
            <ul>
              <li>Product interaction data needed to operate app features, such as selected sites, date ranges, filters, and saved app preferences.</li>
              <li>Technical logs, request metadata, IP address, device or app environment details, and error information used for security, troubleshooting, uptime, and performance.</li>
              <li>Session tokens stored on the device to keep authorized users signed in. On iOS, session data is stored using secure device storage.</li>
            </ul>
          </section>

          <section>
            <h2>3. Apple App Privacy Summary</h2>
            <p>For App Store privacy disclosures, the app may collect the following Apple data categories when you use the applicable features:</p>
            <ul>
              <li><strong>Contact Info:</strong> name and email address for account access, support, and administration.</li>
              <li><strong>Identifiers:</strong> user ID, account ID, organization ID, site ID, and authentication/session identifiers.</li>
              <li><strong>User Content:</strong> facility notes, AI chat messages, asset records, photos, and nameplate images that users choose to submit.</li>
              <li><strong>Usage Data:</strong> app interactions, preferences, selected views, and feature usage needed to provide app functionality and improve the product.</li>
              <li><strong>Diagnostics:</strong> crash, error, performance, request, and security logs used to maintain reliability and security.</li>
              <li><strong>Other Data:</strong> utility, billing, energy, site, facility, asset, emissions, and sustainability data associated with an organization or facility account.</li>
            </ul>
            <p>
              This data is generally linked to your account, organization, site, facility, or app session so that we can provide the requested services to authorized users.
            </p>
            <p>
              We do not use the Edviro app to track users across apps or websites owned by other companies for targeted advertising or advertising measurement. We do not sell personal information and we do not display third-party ads in the app.
            </p>
          </section>

          <section>
            <h2>4. How We Use Information</h2>
            <p>We use information for the following purposes:</p>
            <ul>
              <li>To authenticate users and provide access to the correct organization, site, facility, and asset information.</li>
              <li>To deliver energy analytics, utility billing insights, emissions calculations, sustainability goals, anomaly tracking, savings reports, and facility management tools.</li>
              <li>To store and display asset photos, process nameplate images, and prefill equipment information when requested.</li>
              <li>To operate AI-assisted chat, research, and recommendation features that support facility and energy workflows.</li>
              <li>To personalize the in-app experience, including saved filters, selected sites, selected date ranges, and app preferences.</li>
              <li>To provide customer support, investigate issues, prevent misuse, protect accounts, and maintain service reliability and security.</li>
              <li>To comply with applicable legal, contractual, customer, utility, and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2>5. Camera, Photos, and Device Permissions</h2>
            <p>
              The app may ask for camera or photo library access so you can photograph, select, upload, and manage facility asset images. You control these permissions through your device settings. If you deny access, features that rely on camera or photo uploads may not work.
            </p>
            <p>
              We do not collect precise GPS location through the mobile app. Facility map positions are user-entered or system-managed coordinates within a site map and are used only for facility operations.
            </p>
          </section>

          <section>
            <h2>6. How We Share Information</h2>
            <p>We share information only as needed to provide, secure, and improve the Edviro app:</p>
            <ul>
              <li>With the organization or administrator responsible for the account.</li>
              <li>With service providers that host, store, process, or secure app data, including Supabase for authentication, database, and storage services, and Cloudflare or AI infrastructure providers for app and AI assistant functionality.</li>
              <li>With utility, facilities, or integration partners when authorized by the account-holding organization or required to deliver requested energy services.</li>
              <li>With legal, regulatory, or governmental authorities when required by law or to protect rights, safety, and security.</li>
            </ul>
            <p>
              Service providers are permitted to use information only to provide services to Edviro and are not authorized to sell it or use it for their own advertising.
            </p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>
              We retain information for as long as needed to provide the app, maintain customer records, support utility and facility workflows, comply with legal or contractual obligations, resolve disputes, and enforce agreements. Account data is retained until deletion is requested or the account relationship ends, unless we are required or permitted to retain it longer. Asset photos, facility records, energy data, billing data, and AI workflow records may be retained according to the organization's configuration, service agreements, and operational needs.
            </p>
          </section>

          <section>
            <h2>8. Security</h2>
            <p>
              We use reasonable administrative, technical, and organizational safeguards designed to protect information, including encrypted transport, access controls, authentication, secure session storage, and service-provider security controls. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>9. Customer, Occupant, and Student Data</h2>
            <p>
              The app is intended for authorized facilities, operations, and administrative users at the organizations we serve, not for direct use by children or the general public. Where a customer's data includes information subject to sector-specific privacy laws or data agreements — for example, student records covered by student privacy laws when the customer is a school district — we process that information as a service provider to the customer and use it only to provide and support the contracted services.
            </p>
          </section>

          <section>
            <h2>10. Your Privacy Choices and Rights</h2>
            <p>
              You may request access, correction, deletion, or export of personal information by contacting us. Some requests may need to be handled through your organization or account administrator, and some information may be retained when required for legal, security, audit, billing, or operational reasons.
            </p>
            <p>
              California residents may have additional rights under the California Consumer Privacy Act, including the right to know, delete, correct, and opt out of certain sharing. We do not sell personal information or use it for cross-context behavioral advertising.
            </p>
            <p>
              You can also manage camera and photo permissions in your device settings and sign out of the app from the account settings screen.
            </p>
          </section>

          <section>
            <h2>11. International Transfers</h2>
            <p>
              Edviro and its service providers may process information in the United States and other locations where our providers operate. Where required, we use appropriate safeguards for cross-border transfers.
            </p>
          </section>

          <section>
            <h2>12. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted at https://edviroenergy.com/privacy, and the "Last updated" date will reflect the latest revision.
            </p>
          </section>

          <section>
            <h2>13. Contact Us</h2>
            <p>If you have questions or want to exercise privacy rights, contact us at:</p>
            <ul class="plain">
              <li>Email: <a href="mailto:founders@edviroenergy.com">founders@edviroenergy.com</a></li>
            </ul>
          </section>
        </div>

        <div
          v-show="tab === 'dashboard'"
          id="panel-dashboard"
          role="tabpanel"
          aria-labelledby="tab-dashboard"
        >
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Edviro ("we," "us," or "our"). We are committed to protecting your privacy and ensuring transparency regarding how we collect, use, and protect personal information.
            </p>
            <p>This Privacy Policy explains:</p>
            <ul>
              <li>What data we collect</li>
              <li>How we use it</li>
              <li>How we secure it</li>
              <li>Your rights under CCPA and applicable laws</li>
            </ul>
            <p>This policy applies when you:</p>
            <ul>
              <li>Visit our website (https://edviroenergy.com)</li>
              <li>Use our energy analytics platform</li>
              <li>Authorize access via PG&amp;E's Share My Data program</li>
            </ul>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>We only collect the data necessary to provide our services.</p>

            <h3>a) Data You Provide Voluntarily</h3>
            <ul>
              <li>Account Information: Name, email, organization, and login credentials.</li>
              <li>Support Requests: Any information you provide when contacting us.</li>
            </ul>

            <h3>b) Data We Collect from PG&amp;E Share My Data</h3>
            <p>When you authorize access through PG&amp;E's Share My Data program, we receive:</p>
            <ul>
              <li>
                <strong>Commodity Types:</strong>
                <ul>
                  <li>Electric usage and billing data</li>
                  <li>Gas usage and billing data</li>
                </ul>
              </li>
              <li>
                <strong>Historical Data Access:</strong>
                <ul>
                  <li>Up to 48 months of historical data</li>
                  <li>Daily data updates</li>
                  <li>Access duration: 5 years from authorization</li>
                </ul>
              </li>
              <li>
                <strong>Specific Data Elements:</strong>
                <ul>
                  <li>Basic account information</li>
                  <li>Billing data and history</li>
                  <li>Energy usage patterns and metrics</li>
                  <li>Program enrollment status</li>
                  <li>Meter configuration data</li>
                  <li>Peak Day Pricing (PDP) program status</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use collected data only for the following purposes:</p>
            <ul>
              <li>To provide energy usage analytics for school districts and other facility operators.</li>
              <li>To securely retrieve and process PG&amp;E energy data via Share My Data.</li>
              <li>To improve our website and dashboard performance.</li>
              <li>To comply with legal, security, and regulatory requirements.</li>
            </ul>
            <p>We do not:</p>
            <ul>
              <li>Sell or share your data with advertisers.</li>
              <li>Store unnecessary personal information.</li>
              <li>Use data for any reason beyond our stated business purpose.</li>
            </ul>
          </section>

          <section>
            <h2>4. How We Share Your Information</h2>
            <p>We only share your information in limited cases:</p>
            <ul>
              <li>With PG&amp;E if you authorize energy data access.</li>
              <li>With service providers, such as secure cloud hosting and analytics providers.</li>
              <li>With government agencies if legally required.</li>
            </ul>
            <p>We do not sell personal information.</p>
          </section>

          <section>
            <h2>5. Your Rights Under the California Consumer Privacy Act (CCPA)</h2>
            <p>If you are a California resident, you have the following rights:</p>
            <h3>a) Right to Know</h3>
            <p>You can request details on:</p>
            <ul>
              <li>What data we collect</li>
              <li>How we use it</li>
              <li>With whom we share it</li>
            </ul>
            <h3>b) Right to Delete</h3>
            <p>You can request deletion of your personal information, except when required for:</p>
            <ul>
              <li>Security and fraud prevention</li>
              <li>Compliance with legal obligations</li>
              <li>Providing requested services</li>
            </ul>
            <h3>c) Right to Opt Out</h3>
            <p>We do not sell data, but you can opt out of analytics tracking where applicable.</p>
            <h3>d) Right to Non-Discrimination</h3>
            <p>We will not deny services if you exercise your privacy rights.</p>
            <p>To exercise any rights, contact us at <a href="mailto:founders@edviroenergy.com">founders@edviroenergy.com</a>.</p>
          </section>

          <section>
            <h2>6. Security Measures</h2>
            <p>We take data security seriously and use industry practices, including:</p>
            <ul>
              <li>Encryption to protect data at rest and in transit.</li>
              <li>Secure API authentication to restrict access to authorized users only.</li>
              <li>Access controls to prevent unauthorized data exposure.</li>
            </ul>
            <p>While we strive to protect your data, no system is 100% secure.</p>
          </section>

          <section>
            <h2>7. Cookies and Tracking</h2>
            <p>We use cookies only for essential functionality and analytics.</p>
            <ul>
              <li>You can opt out by disabling cookies in your browser.</li>
              <li>We do not track sensitive data or serve targeted ads.</li>
            </ul>
          </section>

          <section>
            <h2>8. Data Retention Policy</h2>
            <ul>
              <li>PG&amp;E energy data is stored only as long as necessary to provide analytics.</li>
              <li>User accounts are retained until account deletion is requested, subject to legal and contractual requirements.</li>
              <li>Analytics data is retained for site optimization, then deleted or de-identified.</li>
            </ul>
          </section>

          <section>
            <h2>9. Third-Party Services &amp; Data Transfers</h2>
            <p>We use third-party services for hosting and analytics. Our service providers are expected to:</p>
            <ul>
              <li>Comply with data security policies</li>
              <li>Use information only to provide services to Edviro</li>
              <li>Not share or sell collected information for advertising</li>
            </ul>
            <p>Your data remains within the U.S. unless required by international regulations or supported service-provider operations.</p>
          </section>

          <section>
            <h2>10. Updates to This Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically. All updates will be posted at https://edviroenergy.com/privacy.</p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>If you have questions, you can contact us at:</p>
            <ul class="plain">
              <li>Email: <a href="mailto:founders@edviroenergy.com">founders@edviroenergy.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 6px;
  margin-bottom: 36px;
  background: #f5f7f5;
  border: 1px solid #d8ded9;
  border-radius: 999px;
}
.tab {
  appearance: none;
  background: transparent;
  border: 0;
  font: inherit;
  font-size: 14.5px;
  font-weight: 500;
  color: #4b5550;
  padding: 11px 16px;
  border-radius: 999px;
  cursor: pointer;
}
.tab:hover {
  color: #171d1a;
}
.tab.is-active {
  background: #edf0ee;
  color: #171d1a;
  box-shadow: 0 1px 0 rgba(23, 29, 26, 0.06);
}
.tab:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.policy section + section {
  margin-top: 36px;
  padding-top: 32px;
  border-top: 1px solid #d8ded9;
}
.policy h2 {
  margin: 0 0 14px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.policy h3 {
  margin: 22px 0 8px;
  font-size: 16.5px;
  font-weight: 600;
}
.policy p,
.policy li {
  font-size: 16px;
  line-height: 1.62;
  color: #4b5550;
}
.policy p {
  margin: 0 0 14px;
}
.policy p:last-child {
  margin-bottom: 0;
}
.policy ul {
  margin: 0 0 14px;
  padding-left: 22px;
}
.policy ul:last-child {
  margin-bottom: 0;
}
.policy li + li {
  margin-top: 6px;
}
.policy ul ul {
  margin: 8px 0 0;
}
.policy a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}
.policy a:hover {
  text-decoration: underline;
}
.policy ul.plain {
  list-style: none;
  padding-left: 0;
}
</style>
