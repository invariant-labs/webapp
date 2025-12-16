import { Box, Grid, Typography } from '@mui/material'
import useStyles from './styles'

export const TermsPage: React.FC = () => {
  const { classes } = useStyles()

  return (
    <Grid className={classes.outerWrapper}>
      <Grid container className={classes.wrapper}>
        <Typography role='h2' className={classes.title}>
          INVARIANT TERMS OF USE
        </Typography>

        <Typography className={classes.lastUpdate}>Last updated: November 15, 2025</Typography>
        <Grid display={'flex'} flexDirection={'column'} gap={'64px'}>
          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>
              1. Scope and Legal Nature of the Agreement
            </Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: This interface is only a tool to access decentralized systems and is not a
                financial service, so you are solely responsible for how you use it.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              The interface serves exclusively as a technological means of interacting with
              decentralized systems deployed on distributed ledger technology (“DLT”). It does not
              constitute a custodial service, financial exchange, brokerage platform, investment
              service, payment institution, or any form of regulated financial or fiduciary
              infrastructure. These Terms supersede all prior statements, communications, or
              understandings regarding your use of the interface.
            </Typography>
            <Typography className={classes.paragraph}>
              You are entering into a binding Agreement.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>2. Services</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: The interface provides access to decentralized smart-contract systems
                deployed by Invariant on distributed ledger technology. These smart contracts
                operate autonomously and independently of Invariant, and you may interact with them
                either directly or through the interface. The role of the interface is limited
                strictly to enabling transaction submission; it does not alter, influence, or
                intermediate any on-chain activity.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              <span>
                {' '}
                The Protocol allows users to interact with digital assets in a decentralized and
                peer-to-peer environment. Users may contribute liquidity by allocating their digital
                assets into decentralized liquidity pools (“
              </span>{' '}
              <strong className={classes.accent}>Liquidity Pools</strong>
              <span>
                {' '}
                ”), thereby enabling other participants to execute swaps or other interactions
                directly against that liquidity. Digital assets applicable to these pools may
                consist of any fungible tokens supported by the underlying DLT network.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              Liquidity Pools are created and controlled solely by their respective liquidity
              providers, who determine asset pairings, allocation, and associated parameters. All
              interactions between liquidity providers and traders occur directly through autonomous
              smart contracts and, where applicable, additional smart contracts deployed by
              unrelated third parties. These interactions form a direct peer-to-peer relationship
              between users of the Protocol. Invariant does not participate in, supervise, validate,
              or oversee these relationships, nor does it assume any obligations, duties, or
              liabilities arising from them.
            </Typography>
            <Typography className={classes.paragraph}>
              Invariant is not a counterparty to any transaction conducted through the Protocol,
              does not act as a broker, intermediary, custodian, or agent, and does not take
              possession of or exercise control over any digital assets used within Liquidity Pools.
              Liquidity providers and traders assume all risks associated with their own actions,
              including technical risks, market risks, and contractual risks embedded in
              smart-contract interactions.
            </Typography>
            <Typography className={classes.paragraph}>
              Neither the interface nor Invariant provides digital-asset exchange services,
              portfolio management services, investment advice, or any regulated financial service.
              Any decision you make to interact with Liquidity Pools, provide liquidity, or engage
              in trades is undertaken at your sole discretion and risk. Invariant and its
              affiliates, directors, contributors, developers, and employees shall not be liable for
              any direct or indirect loss arising from your use of Liquidity Pools, reliance on
              information displayed through the interface, or outcomes stemming from smart-contract
              execution, including but not limited to errors, omissions, unexpected behavior, or
              alterations of on-chain data.
            </Typography>
            <Typography className={classes.paragraph}>
              THE SITE SOLELY FUNCTIONS AS A VISUAL USER INTERFACE. IN NO CIRCUMSTANCES SHALL THE
              COMPANY, THE SMART CONTRACTS, OR THE SITE BE CONSTRUED AS A DIGITAL ASSET EXCHANGE,
              BROKER, DEALER, FUND MANAGER, FINANCIAL INSTITUTION, EXCHANGE, CUSTODIAN,
              ROBO-ADVISOR, INTERMEDIARY, OR CREDITOR. THE SITE DOES FACILITATE OR ARRANGE
              TRANSACTIONS BETWEEN BUYERS AND SELLERS, INCLUDING WITH RESPECT TO ANY TRANSACTIONS
              THAT OCCUR IN CONNECTION WITH A LIQUIDITY POOL, WHICH TRANSACTIONS OCCUR ON THE
              RELEVANT BLOCKCHAIN NETWORK. THE COMPANY IS NOT A COUNTERPARTY TO ANY TRANSACTION
              FACILITATED BY THE SMART CONTRACTS OR THE SITE OR FOR ANY USER OF THE SITE. NEITHER
              THE SMART CONTRACTS OR THE SITE PROVIDES FINANCIAL ADVISORY, LEGAL, REGULATORY, OR TAX
              SERVICES DIRECTLY, INDIRECTLY, IMPLICITLY, OR IN ANY OTHER MANNER, AND YOU SHOULD NOT
              CONSIDER ANY CONTENT CONTAINED IN THESE TERMS OR OTHERWISE POSTED ON THE SITE TO BE A
              SUBSTITUTE FOR PROFESSIONAL FINANCIAL, LEGAL, REGULATORY, TAX OR OTHER ADVICE. THE
              COMPANY DOES NOT SUPPORT OR ENDORSE ANY LIQUIDITY POOL CREATED BY ANY USER OF
              INVARIANT, AND EACH SUCH CREATOR IS AN INDEPENDENT AGENT WITH NO EMPLOYMENT OR OTHER
              CONTRACTUAL RELATIONSHIP WITH THE COMPANY.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>
              3. Nature of Distributed Ledger Technology and Operational Autonomy
            </Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: Decentralized networks operate independently and no one, including us, can
                change or undo transactions once confirmed.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              The interface grants access to decentralized and autonomous smart-contract systems
              that operate solely through DLT networks. These networks are maintained collectively
              by independent participants who validate and record transactions through consensus
              mechanisms that do not depend on our authority or oversight. You understand and
              acknowledge that no centralized authority, including Invariant, has the ability to
              intervene in, alter, or reverse the execution of smart contracts or transactions once
              they have been confirmed on a DLT network. The decentralized nature of the Protocol
              ensures that its operation is independent and permissionless and that it is not
              subject to modification, halting, suspension, or any form of administrative influence
              by us or by any affiliated party.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>
              4. Distinction Between Interface and Protocol
            </Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: The interface is separate from the Protocol, and the Protocol runs on its own
                whether or not the interface exists.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              <span>
                The interface is a separate, optional user-access layer that enables the submission
                of transaction instructions to autonomous smart contracts (“
              </span>
              <strong className={classes.accent}>the Protocol</strong>
              <span>
                ”). The interface and the Protocol are independent of one another. We do not
                control, own, operate, or modify the Protocol; we do not maintain administrative
                privileges over its smart contracts; and we cannot influence, override, or reverse
                outcomes executed by the Protocol.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              The Protocol may be accessed directly without the interface, and its continued
              operation does not depend on the availability, functionality, or existence of the
              interface. All interactions with the Protocol occur entirely according to its
              immutable code deployed on DLT.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>
              5. Eligibility, Age of Majority, and Legal Capacity
            </Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR:You must be an adult with legal capacity and allowed by your local laws to use
                Invariant protocol.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              By using the interface, you represent that you are a natural person acting on your own
              behalf, that you have reached the age of majority applicable in your jurisdiction, and
              that you possess full legal capacity to enter into binding agreements. You further
              confirm that your use of decentralized technologies is not prohibited by any
              applicable laws related to digital assets, sanctions, financial regulations, consumer
              protection, taxation, or data governance.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>6. Restricted Jurisdictions</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: You must confirm that you are not subject to sanctions, not acting for any
                sanctioned party, and not using illicit funds. Access is prohibited if you are
                located in or associated with a high-risk or sanctioned
              </span>
              jurisdiction.
            </Typography>
            <Typography className={classes.paragraph}>
              You represent and warrant that you are not, and have never been, the subject of any
              economic, financial, or trade sanctions imposed, administered, or enforced by the
              United Nations, the European Union, the United States (including the Office of Foreign
              Assets Control), the United Kingdom, or any other competent authority. You further
              confirm that you are not acting for, or on behalf of, any person or entity subject to
              such sanctions, and that no funds or digital assets used by you originate from
              activities that violate applicable sanctions laws, anti-money-laundering regulations,
              or counter-terrorism financing rules.
            </Typography>
            <Box>
              <Typography className={classes.paragraph}>
                Restricted regions include, without limitation:
              </Typography>
              <ul className={classes.list}>
                <li>United States of America and its territories</li>
                <li>Canada</li>
                <li>European Union (27 member states)</li>
                <li>United Kingdom</li>
                <li>People’s Republic of China</li>
                <li>Hong Kong SAR</li>
                <li>Singapore</li>
                <li>Iran</li>
                <li>Syria</li>
                <li>North Korea</li>
                <li>Cuba</li>
                <li>Myanmar</li>
                <li>Sudan and South Sudan</li>
                <li>Belarus</li>
                <li>Venezuela (restricted regions)</li>
                <li>Crimea</li>
                <li>Donetsk</li>
                <li>Luhansk</li>
              </ul>
            </Box>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>7. Third-Party Wallet Requirement</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: You use your own non-custodial wallet and you alone control your keys and
                access. Any wallet loss, failure, or compromise is entirely your responsibility.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              Interaction with the Protocol requires the use of a third-party, non-custodial digital
              wallet capable of signing transactions on DLT-based systems. Such wallets are not
              owned, operated, monitored, or controlled by us. We do not retain access to your
              private keys, seed phrases, backup materials, authentication credentials, or wallet
              recovery mechanisms. Any loss of access, compromise of credentials, technical
              malfunction, or unauthorized use of your wallet is solely your responsibility.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>8. Risks of Smart Contracts</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: You acknowledge and agree that all interactions performed through the
                interface involve self-executing smart contracts deployed on decentralized
                distributed ledger technology. Smart contracts operate autonomously according to
                their code and are not subject to manual intervention, override, suspension,
                correction, or discretionary control by us or any third party. Once a transaction is
                broadcast and confirmed by the relevant DLT network, it becomes final, irreversible,
                and beyond alteration.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              Smart contracts may contain vulnerabilities, unintended logic paths, design
              limitations, or dependencies on external data sources. Their operation may be
              influenced by network conditions, validator behavior, data-flow inconsistencies, or
              adversarial activity. As such, smart-contract interactions may result in failed
              transactions, partial execution, unexpected outcomes, or permanent loss of digital
              assets.
            </Typography>
            <Typography className={classes.paragraph}>
              We make no representations, warranties, or guarantees regarding the reliability,
              accuracy, functionality, or security of any smart contract that you interact with.
              Your engagement with smart contracts is undertaken entirely at your own risk, and you
              are solely responsible for verifying their suitability and technical soundness before
              executing any transaction. You understand that neither we nor any affiliated party
              bears liability for any damage, loss, malfunction, or adverse consequence arising from
              smart-contract execution.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>
              9. Absence of Custody, Control, or Intermediary Role
            </Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: We never hold your assets, handle your transactions, or in any way control
                the funds you provide as liquidity. At no point can we, or the Protocol, be
                considered an intermediary or broker
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              We do not custody, store, hold, manage, or control digital assets on your behalf. We
              do not mediate, broker, or execute transactions and do not provide settlement,
              clearing, or escrow functions. All transactions initiated through the interface occur
              directly through your interaction with the Protocol and the DLT, without our
              involvement or ability to alter their outcome. You bear sole responsibility for
              verifying the accuracy and appropriateness of transaction details before authorizing
              them.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>
              10. No Financial, Legal, or Tax Advice
            </Typography>
            <Typography className={classes.paragraph}>
              Nothing here is advice; you must evaluate risks yourself or consult professionals.
            </Typography>
            <Typography className={classes.paragraph}>
              The interface and any information provided through it are intended solely for
              informational and technological purposes. Nothing within the interface constitutes
              financial, legal, tax, or investment advice. You are solely responsible for evaluating
              the legal and economic consequences of your actions and for seeking independent
              professional advice.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>11. Limitation of Liability</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: Your use of the interface is entirely at your own risk, and our liability is
                strictly limited.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              UNDER NO CIRCUMSTANCES SHALL WE, ANY INVARIANT PARTIES, OR ANY THIRD-PARTY SERVICES BE
              LIABLE TO YOU FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS,
              GOODWILL, USE, DATA, OR OTHER INTANGIBLE PROPERTY, ARISING OUT OF OR RELATING TO ANY
              ACCESS OR USE OF OR INABILITY TO ACCESS OR USE ANY OF THE PRODUCTS OR ANY THIRD-PARTY
              SERVICES. WE WILL NOT BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM
              HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF ANY OF THE PRODUCTS,
              THIRD-PARTY SERVICES, OR THE INFORMATION CONTAINED WITHIN THEM, WHETHER SUCH DAMAGES
              ARE BASED IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, ARISING OUT
              OF OR IN CONNECTION WITH AUTHORIZED OR UNAUTHORIZED USE OF ANY OF THE PRODUCTS OR ANY
              THIRD-PARTY SERVICES, EVEN IF AN AUTHORIZED REPRESENTATIVE OF INVARIANT HAS BEEN
              ADVISED OF, KNEW, OR SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES.
            </Typography>

            <Typography className={classes.paragraph}>
              WE ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY: (A) ERRORS, MISTAKES, OR
              INACCURACIES OF CONTENT; (B) PERSONAL INJURY OR PROPERTY DAMAGE OF ANY NATURE
              WHATSOEVER RESULTING FROM ANY ACCESS OR USE OF THE INTERFACE; (C) UNAUTHORIZED ACCESS
              OR USE OF ANY SECURE SERVER OR DATABASE IN OUR CONTROL OR THE USE OF ANY INFORMATION
              OR DATA STORED THEREIN; (D) INTERRUPTION OR CESSATION OF FUNCTION RELATED TO ANY OF
              THE PRODUCTS OR THIRD-PARTY SERVICES; (E) BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
              THAT MAY BE TRANSMITTED TO OR THROUGH THE INTERFACE; (F) ERRORS OR OMISSIONS IN, OR
              LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF, ANY CONTENT MADE AVAILABLE THROUGH
              ANY OF THE PRODUCTS OR THIRD-PARTY SERVICES; AND (G) THE DEFAMATORY, OFFENSIVE, OR
              ILLEGAL CONDUCT OF ANY THIRD PARTY.
            </Typography>

            <Typography className={classes.paragraph}>
              WE HAVE NO LIABILITY TO YOU OR TO ANY THIRD PARTY FOR ANY CLAIMS OR DAMAGES THAT MAY
              ARISE AS A RESULT OF ANY PAYMENTS OR TRANSACTIONS THAT YOU ENGAGE IN VIA ANY OF OUR
              PRODUCTS OR ANY THIRD-PARTY SERVICES, OR ANY OTHER PAYMENTS OR TRANSACTIONS THAT YOU
              CONDUCT VIA ANY OF OUR PRODUCTS. EXCEPT AS EXPRESSLY PROVIDED FOR HEREIN, WE DO NOT
              PROVIDE REFUNDS FOR ANY PURCHASES MADE ON OR THROUGH ANY OF OUR PRODUCTS.
            </Typography>

            <Typography className={classes.paragraph}>
              NEITHER WE NOR ANY PROVIDERS OF THIRD-PARTY SERVICES MAKE ANY WARRANTIES OR
              REPRESENTATIONS, EXPRESS OR IMPLIED, ABOUT LINKED THIRD-PARTY SERVICES, THE THIRD
              PARTIES THAT OWN OR OPERATE THEM, THE INFORMATION CONTAINED ON THEM, ASSETS AVAILABLE
              THROUGH THEM, OR THE SUITABILITY, PRIVACY, OR SECURITY OF THEIR PRODUCTS OR SERVICES.
              YOU ACKNOWLEDGE SOLE RESPONSIBILITY FOR AND ASSUME ALL RISK ARISING FROM YOUR USE OF
              THIRD-PARTY SERVICES, THIRD-PARTY WEBSITES, APPLICATIONS, OR RESOURCES. WE SHALL NOT
              BE LIABLE UNDER ANY CIRCUMSTANCES FOR DAMAGES ARISING OUT OF OR IN ANY WAY RELATED TO
              SOFTWARE, PRODUCTS, SERVICES, AND/OR INFORMATION OFFERED OR PROVIDED BY THIRD PARTIES
              AND ACCESSED THROUGH ANY OF OUR PRODUCTS.
            </Typography>

            <Typography className={classes.paragraph}>
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OF LIABILITY FOR PERSONAL INJURY OR FOR
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THIS LIMITATION MAY NOT APPLY TO YOU. IN NO
              EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES (OTHER THAN AS REQUIRED BY
              APPLICABLE LAW IN CASES INVOLVING PERSONAL INJURY) EXCEED ONE HUNDRED U.S. DOLLARS
              ($100.00 USD) OR ITS EQUIVALENT IN THE LOCAL CURRENCY OF THE APPLICABLE JURISDICTION.
            </Typography>

            <Typography className={classes.paragraph}>
              THE FOREGOING DISCLAIMER WILL NOT APPLY TO THE EXTENT PROHIBITED BY LAW.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>12. Prohibited Activities</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: Do not use the interface for illegal activity, attacks, manipulation, or
                misuse of any kind.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              You agree not to use the interface for any unlawful, fraudulent, malicious, or harmful
              purpose. Prohibited conduct includes attempting to bypass sanctions, laundering funds,
              exploiting vulnerabilities, manipulating transactions, attacking network
              infrastructure, disrupting interface functionality, accessing systems without
              authorization, or impersonating another person.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>13. Intellectual Property Rights</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: You cannot copy or use materials without permission.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              All proprietary rights, title, and interest in and to the interface, including its
              design, layout, visual elements, text, graphics, code, logos, trademarks, trade names,
              documentation, and any other materials or content made available through or in
              connection with it (collectively, “Interface Materials”), are owned by us or by third
              parties who have granted us the rights to use such materials. The Interface Materials
              are protected by copyright, trademark, and other applicable intellectual property and
              proprietary rights laws. All such rights are expressly reserved.
            </Typography>
            <Typography className={classes.paragraph}>
              You acknowledge that while the underlying decentralized protocol may be open-source or
              governed by separate licensing terms, the interface itself constitutes a distinct
              proprietary product. Your access to the interface grants you no rights, licenses, or
              ownership interests of any kind in the Interface Materials, except for the limited,
              revocable, non-exclusive, non-transferable permission to use the interface solely for
              its intended purpose and strictly in accordance with these Terms.
            </Typography>
            <Typography className={classes.paragraph}>
              You may not copy, reproduce, distribute, modify, publish, reverse-engineer, decompile,
              disassemble, frame, scrape, data-mine, or otherwise exploit any portion of the
              Interface Materials without our prior express written consent. Unauthorized use,
              reproduction, or distribution of the Interface Materials may constitute a violation of
              intellectual property laws and may result in legal action.
            </Typography>
            <Typography className={classes.paragraph}>
              Nothing in these Terms shall be interpreted as granting you any license or right to
              use our trademarks, trade names, branding, domain names, URLs, or other identifying
              marks in any manner without our prior written approval. Misuse of any such identifying
              elements may result in legal liabilit
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>14. No Guarantee of Availability</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: The interface may be changed, limited, interrupted, or discontinued at any
                time, and we do not guarantee its continuous or error-free operation.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              You acknowledge and agree that the interface is provided on an “as available” basis
              and that we do not make any representation, warranty, or commitment regarding its
              continuous availability, uptime, performance, or compatibility. The interface may be
              subject to interruptions, delays, errors, maintenance periods, updates, or
              modifications at any time and for any reason, including technical issues, security
              considerations, or operational requirements.
            </Typography>
            <Typography className={classes.paragraph}>
              We reserve the right, at our sole discretion and without obligation to provide notice,
              to suspend, restrict, disable, modify, or discontinue any portion of the interface.
              Such actions may affect your ability to submit transactions, access information, or
              interact with the Protocol, and may occur with or without prior warning.
            </Typography>
            <Typography className={classes.paragraph}>
              You further acknowledge that availability of the interface may depend on networks,
              technologies, and services provided by third parties—including internet service
              providers, hosting providers, DLT network participants, library maintainers, or wallet
              providers—and that we have no control over and disclaim responsibility for any
              disruptions, failures, or delays caused by such external systems.
            </Typography>
            <Typography className={classes.paragraph}>
              Your ability to interact with the underlying Protocol does not depend on the continued
              availability of the interface. You are solely responsible for ensuring that you
              maintain alternative means of accessing the Protocol should the interface become
              unavailable for any reason.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>15. Indemnification</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: If your actions cause harm, violate laws, or breach these Terms, you must
                cover the resulting damages and costs.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              You agree to indemnify, defend, and hold harmless us and our officers, directors,
              employees, contractors, developers, agents, affiliates, and subsidiaries from and
              against any and all claims, demands, liabilities, damages, losses, costs, expenses,
              and legal fees arising out of or relating to (a) your use of the interface, the smart
              contracts, or any DLT-based system; (b) your breach or alleged breach of these Terms;
              (c) your violation of any applicable law or regulation; (d) your infringement of any
              rights of a third party; or (e) any activity conducted through your wallet, whether
              authorized or unauthorized.
            </Typography>
            <Typography className={classes.paragraph}>
              You agree that this indemnification obligation applies regardless of whether claims
              arise directly or indirectly from your actions, omissions, negligence,
              misrepresentations, or unauthorized access to your digital wallet. You further agree
              that we shall have the right, but not the obligation, to assume exclusive defense and
              control of any matter otherwise subject to indemnification, and that you will
              cooperate fully with any such defense.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>16. Final Provisions</Typography>
            <Typography className={classes.paragraph}>
              <span className={classes.tldr}>
                TL;DR: These Terms govern your use of the interface and remain binding even if
                individual statements are adjusted or updated.
              </span>
            </Typography>
            <Typography className={classes.paragraph}>
              These Terms constitute the entire agreement governing your use of the interface. If
              any provision is deemed invalid or unenforceable, it shall be modified only to the
              extent necessary to preserve its intent. All remaining provisions remain in full
              effect. Continued use of the interface constitutes your acceptance of all current and
              future versions of the Terms.
            </Typography>
          </Grid>

          <Grid className={classes.section}>
            <Typography className={classes.subTitle}>17. Contact Us</Typography>
            <Typography className={classes.paragraph}>
              You may contact us with questions about your use of the Services at{' '}
              <strong>
                <a href='mailto:inbox@invariant.app' className={classes.mail}>
                  inbox@invariant.app
                </a>
              </strong>
              .
            </Typography>
            <Typography className={classes.paragraph}>
              These Terms constitute the entire agreement governing your use of the interface. If
              any provision is deemed invalid or unenforceable, it shall be modified only to the
              extent necessary to preserve its intent. All remaining provisions remain in full
              effect. Continued use of the interface constitutes your acceptance of all current and
              future versions of the Terms.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TermsPage
