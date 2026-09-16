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

const tab = ref<PolicyTab>('dashboard')

usePageSeo({
  title: 'Privacy Policy',
  description:
    'How Edviro collects, uses, shares, and protects information in the mobile app, website, and dashboard, including Green Button connections for Xcel Energy and PG&E.',
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
              This Privacy Policy describes how Edviro Inc. ("Edviro," "we," "us," or "our") collects, uses, shares, and protects information when authorized users access the Edviro mobile application.
            </p>
            <p>
              The Edviro app is designed for facilities, operations, and administrative teams at the organizations we serve (such as school districts and other multi-site facility operators) to review energy usage, utility billing insights, sustainability goals, facility assets, anomaly tracking, savings reports, and AI-assisted operational guidance. This policy is intended to support Apple's App Store privacy requirements by explaining the categories of data the app may collect, whether that data is linked to a user, how it is used, and whether it is used for tracking.
            </p>
          </section>

          <p>
            The Green Button and other utility-data provisions in the Website &amp; Dashboard section also apply to utility information accessed through the mobile app. Those provisions govern authorized uses, sharing, revocation, and retention of utility data and take precedence over more general descriptions in this Mobile App section.
          </p>

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
              We do not use the Edviro app to track users across apps or websites owned by other companies for targeted advertising or advertising measurement. We do not sell personal information collected through the mobile app and we do not display third-party ads in the app.
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
              California residents may have additional rights under the California Consumer Privacy Act, including the right to know, delete, correct, and opt out of certain sharing. We do not sell personal information collected through the mobile app or use that information for cross-context behavioral advertising.
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
              We may update this Privacy Policy from time to time. The current policy is available at https://edviroenergy.com/privacy/ and https://dash.edviroenergy.com/privacy-policy. The "Last updated" date will reflect the latest revision. Where required, we notify affected customers of material changes and obtain any necessary additional consent. You may request prior versions at founders@edviroenergy.com.
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
            <p>This Privacy Policy describes how Edviro Inc. ("Edviro," "we," "us," or "our") collects, uses, shares, and protects information when you visit our website, use our facilities and energy management platform, or authorize a utility-data connection.</p>
            <p>Our platform serves authorized facilities, operations, and administrative teams at organizations such as school districts and other facility operators. This policy covers utility information received through Green Button Connect My Data and utility-branded data-sharing programs, including Xcel Energy's Green Button program in Minnesota and PG&amp;E's Share My Data program, where the connection is available and you have authorized it.</p>
            <p>The utility-data provisions below also apply when that information is accessed through the Edviro mobile app. A reference to a utility or program describes how we handle authorized data; it does not represent that the utility endorses Edviro or that every integration is available to every customer.</p>
          </section>

          <section id="utility-data">
            <h2>2. Information We Collect</h2>
            <h3>a) Information You Provide</h3>
            <ul>
              <li>Account and contact information, including your name, email address, organization, role, and Edviro account authentication information.</li>
              <li>Facility and asset records, documents, photos, work orders, notes, and other content that authorized users submit to the platform.</li>
              <li>Support requests and prompts, messages, confirmations, and responses associated with AI-assisted features.</li>
            </ul>
            <h3>b) Green Button and Other Authorized Utility Data</h3>
            <p>We receive utility data only after the utility account holder or an authorized representative grants access. Depending on the utility, meter, program, and authorization, this may include:</p>
            <ul>
              <li>Customer, account, service-agreement, and meter identifiers; account-holder information; and service addresses or other service-location details.</li>
              <li>Electricity or natural gas consumption, interval readings, demand, meter configuration, and usage summaries.</li>
              <li>Billing periods, charges, costs, rates or tariffs, and billing line items.</li>
              <li>Program enrollment or pricing-program information where provided, such as PG&amp;E Peak Day Pricing status.</li>
              <li>Authorization records and access or refresh tokens used to maintain the connection.</li>
            </ul>
            <p>Historical coverage, update frequency, permitted data categories, and the authorization end date depend on the applicable utility program and the customer's consent. We do not promise a uniform historical lookback, daily delivery, or a fixed authorization period across utilities. The period of data made available by a utility is separate from how long Edviro retains information already received.</p>
            <p>For Green Button connections that use the utility's authorization page, you authenticate with the utility. Edviro does not receive or store the password you enter on that page; we use the resulting authorization and access tokens.</p>
            <h3>c) Technical and Usage Information</h3>
            <p>We may collect IP addresses, browser or device information, session identifiers, product interactions, and diagnostic or security logs to operate, secure, and support our website and platform. Cookies and similar technologies are described in Section 7.</p>
          </section>

          <section>
            <h2>3. How We Use Information</h2>
            <ul>
              <li>Authenticate users and provide access to their organization's facilities and records.</li>
              <li>Retrieve authorized utility data and provide energy monitoring, billing analysis, benchmarking, forecasting, anomaly detection, savings analysis, and efficiency recommendations.</li>
              <li>Support facility and asset management, work orders, reporting, and customer-requested operational workflows.</li>
              <li>Provide support, diagnose technical problems, maintain reliability and security, and understand website and product performance.</li>
              <li>Meet applicable legal, regulatory, security, and contractual obligations.</li>
            </ul>
            <p>AI-assisted features may process relevant utility or facility records, user-submitted content, and prompts to produce explanations, forecasts, recommendations, or other requested outputs. Providers of these features may receive the information needed to process those requests, as described in Sections 4 and 9.</p>
            <p>Utility data is used only within the purposes and scope authorized by the customer and permitted by the applicable utility program. Permission to provide customer-specific analysis does not, by itself, authorize unrelated research, advertising, or training models for use across customers. Any additional use, including such model training, requires the authorization and other permissions required by the applicable utility terms and law. This policy does not expand a customer's utility authorization.</p>
            <p>We do not sell utility data, use it for targeted advertising, or disclose it to advertisers. Website marketing technologies are described separately in Section 7 and do not authorize advertising use of utility data.</p>
          </section>

          <section>
            <h2>4. How We Share Information</h2>
            <p>Subject to the customer's authorization and applicable utility restrictions, we may share information:</p>
            <ul>
              <li>With authorized users and administrators of the organization responsible for the account.</li>
              <li>With service providers that support hosting, authentication, storage, security, analytics, customer support, and AI processing, to the extent needed to deliver those services.</li>
              <li>With a utility or an integration partner to establish, maintain, or troubleshoot an authorized connection or carry out a customer-requested service.</li>
              <li>When required by applicable law or legal process, subject to any applicable notice requirements and disclosure restrictions.</li>
            </ul>
            <p>Our service providers are permitted to process customer utility data only to provide the authorized services to Edviro. They are not authorized to sell that data, use it for their own advertising, or use it for purposes outside the customer's authorization.</p>
          </section>

          <section id="privacy-choices">
            <h2>5. Your Privacy Choices and Utility Authorization</h2>
            <h3>Granting, Limiting, or Revoking Utility Access</h3>
            <p>You can decline a utility connection, select the scope offered by the utility, or revoke authorization using the utility's data-sharing controls or by contacting the utility. For Xcel Energy, its privacy notice also provides datarequest@xcelenergy.com as a way to request that consent be terminated or limited. For PG&amp;E, manage authorization through Share My Data. You may also contact founders@edviroenergy.com for help with an Edviro connection or a request to stop Edviro's access or use.</p>
            <p>When authorization expires or is revoked, we stop obtaining new data under that authorization. We also honor applicable limits on continued use of information already received. Disconnecting a utility does not itself delete historical information in Edviro; retention and deletion are addressed in Section 8.</p>
            <p>Declining or revoking a connection may prevent Edviro from providing updated analytics or other features that depend on that data. It does not cancel your utility service.</p>
            <h3>Access, Correction, Export, and Deletion</h3>
            <p>You may contact founders@edviroenergy.com to request access, correction, export, or deletion of information, ask about our use or retention of data, or dispute its accuracy. We may verify your identity and authority and coordinate with your organization or account administrator. Corrections to a utility's source records may need to be made with that utility.</p>
            <p>Depending on where you live and which laws apply, you may have additional privacy rights, including rights to know, correct, delete, obtain a copy of information, or opt out of certain processing. California residents may have rights under the California Consumer Privacy Act; Minnesota residents may have rights under the Minnesota Consumer Data Privacy Act where it applies. To exercise a right or appeal a decision on a request, email founders@edviroenergy.com. We respond as required by applicable law and do not unlawfully discriminate for exercising privacy rights.</p>
          </section>

          <section>
            <h2>6. Security</h2>
            <p>We use reasonable administrative, technical, and organizational safeguards designed to protect information, including encrypted transport, authentication, access controls, and service-provider security controls. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2>7. Cookies and Similar Technologies</h2>
            <p>Our website and platform use cookies, local storage, and similar technologies for sign-in, preferences, security, and analytics. Our marketing website also uses Google Ads, LinkedIn Insight Tag, OpenAI advertising measurement, and PostHog analytics. These services may receive technical and activity information such as an IP address, browser details, pages visited, referral information, and interactions to analyze site use and measure marketing campaigns.</p>
            <p>When you book a demo, the marketing website may also send your email address to Google for enhanced conversion matching. Advertising providers may match website events with information they already hold, subject to their privacy policies. These website measurements are separate from the utility-data connections described in this policy.</p>
            <p>You can manage cookies through your browser settings and use the privacy or advertising controls offered by the relevant providers. Disabling cookies may affect sign-in or other functionality. Contact founders@edviroenergy.com to exercise applicable privacy rights concerning website tracking. Utility account records, meter readings, and billing data are not used for advertising or sent to advertising platforms.</p>
          </section>

          <section>
            <h2>8. Retention and Deletion</h2>
            <p>We retain utility, facility, account, and related workflow records while needed to provide the customer's authorized services, including historical comparisons, reporting, and support. The retention period depends on the customer relationship, the purposes authorized, the applicable service agreement and utility terms, and legal requirements; utility authorization length is not a data-retention schedule.</p>
            <p>When the service relationship ends, authorization is limited or withdrawn, or deletion is requested, we assess which records remain necessary and permitted to retain. Information that is no longer needed or permitted for those purposes is deleted or de-identified. Limited records may be retained where required or permitted for legal compliance, security, billing, audits, or disputes, subject to applicable utility restrictions.</p>
            <p>Deletion from active systems and expiry of backup copies are separate processes. Backup copies may remain until overwritten through the applicable backup lifecycle and remain subject to the same protections and use restrictions. Contact founders@edviroenergy.com to request deletion or information about the retention arrangements for your organization's records, including backups.</p>
            <p>Revoking a utility connection stops future collection under that authorization; it does not automatically erase previously collected data. A deletion request and any restrictions on further use are handled separately under this section and applicable law and utility terms.</p>
          </section>

          <section>
            <h2>9. Service Providers and International Processing</h2>
            <p>We use providers for cloud hosting, authentication, databases, storage, security, analytics, and AI processing. Information may be processed in the United States or other locations where our providers operate, subject to applicable customer agreements, utility-program restrictions, and legal requirements. Where required, we use safeguards for international transfers. Contact founders@edviroenergy.com with questions about providers or processing locations relevant to your service.</p>
          </section>

          <section>
            <h2>10. Changes to This Policy</h2>
            <p>We post the current policy at <a href="https://edviroenergy.com/privacy/">edviroenergy.com/privacy/</a> and <a href="https://dash.edviroenergy.com/privacy-policy">dash.edviroenergy.com/privacy-policy</a> and update the revision date when it changes. Where required, we notify affected customers of material changes and obtain additional consent before making materially different uses of previously collected information. You may request prior versions at founders@edviroenergy.com.</p>
          </section>

          <section>
            <h2>11. Contact Us</h2>
            <p>For privacy questions, utility-data requests, or concerns about this policy, contact Edviro Inc. at <a href="mailto:founders@edviroenergy.com">founders@edviroenergy.com</a>.</p>
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
