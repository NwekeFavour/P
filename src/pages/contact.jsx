"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Twitter, Globe, MessageCircle } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Header />

      {/* Subtle Tech Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:24px_24px]" />

      {/* HERO */}
      <section className="sm:py-32 py-20 px-6 text-center max-w-5xl mx-auto">
        <p className="m-0 lg:text-[64px] font-semibold md:text-[62px] sm:text-[52px] text-[42px] xl:text-[72px]">
          Let’s Build the Future with{" "}
          <span className="text-primary">Knownly</span>
        </p>

        <p className="mt-8 text-[16px] sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We partner with ambitious founders, developers, and organizations
          shaping the next generation of digital infrastructure, learning
          systems, and scalable technology solutions.
        </p>
      </section>

      {/* CONTACT INFO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">
                Strategic Conversations Start Here
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Knownly operates at the intersection of innovation, education,
                and digital transformation. Whether you're exploring
                partnerships, integrations, sponsorships, or ecosystem
                collaboration, we value clear, forward-thinking engagement.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                What We’re Open To
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Technology partnerships</li>
                <li>• Developer ecosystem collaborations</li>
                <li>• Educational & learning initiatives</li>
                <li>• Product integrations</li>
                <li>• Strategic advisory conversations</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTACT CARD */}
          <Card className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-xl">
            <CardContent className="p-10 space-y-8">
              
              <div className="flex items-start gap-5">
                <Mail className="text-primary mt-1" />
                <div>
                  <p className="font-semibold text-lg">Email</p>
                  <p className="text-muted-foreground">
                    support@knownly.tech
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Twitter className="text-primary mt-1" />
                <div>
                  <p className="font-semibold text-lg">Twitter / X</p>
                  <a
                    href="https://x.com/knownlyhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition"
                  >
                    @knownlyhq
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <Globe className="text-primary mt-1" />
                <div>
                  <p className="font-semibold text-lg">Website</p>
                  <p className="text-muted-foreground">
                    https://knownly.tech
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full rounded-xl text-base">
                  <a
                    href="https://x.com/knownlyhq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on Twitter
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* COMMUNITY / VISION SECTION */}
      <section className="py-24 px-6 text-center border-t border-border/40">
        <div className="max-w-4xl mx-auto space-y-8">
          <MessageCircle className="mx-auto text-primary" size={36} />
          <h2 className="text-3xl font-semibold">
            Join the Knownly Ecosystem
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We regularly share product insights, ecosystem updates, and
            technology direction across our social channels. If you're
            building, innovating, or scaling something ambitious, stay
            connected.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 text-center bg-primary/10">
        <h3 className="text-2xl font-semibold">
          Clear Ideas. Strong Execution. Measurable Impact.
        </h3>
        <p className="mt-4 text-muted-foreground">
          Reach us at support@knownly.tech or message @knownlyhq.
        </p>
      </section>

      <Footer />
    </div>
  );
}
