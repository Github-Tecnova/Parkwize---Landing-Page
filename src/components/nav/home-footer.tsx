import { LucideAlertTriangle, LucideInstagram, LucideMail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { DictionaryType, LangType } from "@/content/dictionary";

interface HomeFooterProps {
  lang: LangType;
  dict?: DictionaryType;
}

export default function HomeFooter({ lang }: HomeFooterProps) {
  return (
    <div className={"bg-neutral-100"}>
      <div>
        <div
          className={
            "mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-5 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-16"
          }
        >
          <div
            className={"space-y-4 sm:col-span-2 lg:col-span-2 hidden lg:grid"}
          >
            <div className={"space-y-1"}>
              <Link href={`/${lang}`} className={"block w-fit"}>
                <Image
                  src={"/parkwize_logo_tr.png"}
                  alt={"Parkwize Logo"}
                  width={180}
                  height={48}
                  className={"h-10 w-auto object-contain"}
                />
              </Link>
              <p className={"text-sm font-light text-text-muted"}>
                The Future of Parking Intelligence
              </p>
              <div
                className={
                  "flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[10px] text-text-muted"
                }
              >
                <p className={""}>&copy; {new Date().getFullYear()}</p>
                <p>-</p>
                <Link href={"/privacy-policy"} className={"hover:underline"}>
                  Privacy policy
                </Link>
                <p>-</p>
                <Link href={"/terms-of-use"} className={"hover:underline"}>
                  Terms of use
                </Link>
              </div>
            </div>
            <div className={"h-px w-full bg-border-light"} />
            <div className={"flex flex-wrap items-center gap-4"}>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideInstagram className={"m-auto"} />
              </div>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideMail className={"m-auto"} />
              </div>
              <Link
                href={"https://status.parkwizeinc.com"}
                target={"_blank"}
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideAlertTriangle className={"m-auto"} />
              </Link>
              <div className={"flex items-center gap-x-1.5"}>
                <div className={"size-1 rounded-full bg-green-500"} />
                <p className={"text-xs text-green-600"}>Systems operational.</p>
              </div>
            </div>
          </div>

          <div className={"space-y-2 text-center sm:text-left"}>
            <p className={"font-medium text-text"}>Website</p>
            <div
              className={"flex flex-col items-center font-light sm:items-start"}
            >
              <Link href={"#"} className={"w-fit"}>
                Our work
              </Link>
              <Link href={"#"} className={"w-fit"}>
                How it works
              </Link>
              <Link href={"#"} className={"w-fit"}>
                Case study
              </Link>
              <Link href={"#"} className={"w-fit"}>
                FAQ
              </Link>
            </div>
          </div>

          <div className={"space-y-2 text-center sm:text-left"}>
            <p className={"font-medium text-text"}>Actions</p>
            <div
              className={"flex flex-col items-center font-light sm:items-start"}
            >
              <Link href={"#"} className={"w-fit"}>
                Book a call
              </Link>
              <Link href={"https://demo.parkwizeinc.ai"} className={"w-fit"}>
                Explore demo
              </Link>
              <Link href={"#"} className={"w-fit"}>
                Newsletter
              </Link>
            </div>
          </div>

          <div className={"space-y-2 text-center sm:text-left"}>
            <p className={"font-medium text-text"}>Help</p>
            <div
              className={"flex flex-col items-center font-light sm:items-start"}
            >
              <Link href={"#"} className={"w-fit"}>
                Contact us
              </Link>
              <Link
                href={"https://status.parkwizeinc.com/"}
                target={"_blank"}
                className={"w-fit"}
              >
                Status
              </Link>
              <Link href={"/docs/api"} className={"w-fit"}>
                API
              </Link>
              <Link href={"/docs"} className={"w-fit"}>
                Documentation
              </Link>
              <Link href={"/tutorials"} className={"w-fit"}>
                Tutorials
              </Link>
            </div>
          </div>

          <div className={"space-y-4 sm:col-span-2 lg:col-span-2 lg:hidden"}>
            <div className={"space-y-1"}>
              <Link href={`/${lang}`} className={"block w-fit"}>
                <Image
                  src={"/parkwize_logo_tr.png"}
                  alt={"Parkwize Logo"}
                  width={180}
                  height={48}
                  className={"h-10 w-auto object-contain"}
                />
              </Link>
              <p className={"text-sm font-light text-text-muted"}>
                The Future of Parking Intelligence
              </p>
              <div
                className={
                  "flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[10px] text-text-muted"
                }
              >
                <p className={""}>&copy; {new Date().getFullYear()}</p>
                <p>-</p>
                <Link href={"/privacy-policy"} className={"hover:underline"}>
                  Privacy policy
                </Link>
                <p>-</p>
                <Link href={"/terms-of-use"} className={"hover:underline"}>
                  Terms of use
                </Link>
              </div>
            </div>
            <div className={"h-px w-full bg-border-light"} />
            <div className={"flex flex-wrap items-center gap-4"}>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideInstagram className={"m-auto"} />
              </div>
              <div
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideMail className={"m-auto"} />
              </div>
              <Link
                href={"https://status.parkwizeinc.com"}
                target={"_blank"}
                className={
                  "flex size-10 rounded-full border text-text-muted hover:text-text"
                }
              >
                <LucideAlertTriangle className={"m-auto"} />
              </Link>
              <div className={"flex items-center gap-x-1.5"}>
                <div className={"size-1 rounded-full bg-green-500"} />
                <p className={"text-xs text-green-600"}>Systems operational.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HomeFooter };
