import useSWR from "swr";
import Link from "next/link";
import Button from "components/Button";
import HomeIcon from "vectors/HomeIcon";
import Curve from "vectors/Curve";
import Reaction from "vectors/Reaction";
import Question from "vectors/Question";
import Penguins from "vectors/Penguins";
import VercelDeploy from "vectors/buttons/VercelDeploy";
import Watch from "vectors/buttons/Watch";
import Read from "vectors/buttons/Read";
import useAuth from "hooks/useAuth";
import DeployService from "services/deploy";
import ApiService from "services/api";

async function fetcher(route) {
  const eventsRequest = await ApiService.fetch(route, {
    credentials: "include",
  });

  console.log(eventsRequest.status);

  if (eventsRequest.ok) {
    return eventsRequest.json();
  }

  return [];
}

export default function Home(props) {
  const user = useAuth();
  const { data: events } = useSWR(() => {
    if (!user) {
      throw new Error("Cannot get events without user.");
    }

    return `/events/list?user=${user._id}`;
  }, fetcher);

  return (
    <>
      {user && (
        <section className="user">
          <p style={{ paddingBottom: "1rem", width: "100%" }}>
            <strong>Your events</strong>
          </p>
          {events?.length > 0 ? (
            <div className="events">
              {events.map((event) => {
                return (
                  <Link href={`/event/${event._id}`}>
                    <div className="event">
                      <div className="event__title">{event.name}</div>
                      <div className="event__stats">
                        <div className="stat">
                          <strong>
                            {Object.values(event.reactions || {}).reduce(
                              (sum, count) => sum + count,
                              0
                            )}
                          </strong>{" "}
                          Reactions
                        </div>
                        <div className="stat">
                          <strong>{event.questions.length}</strong> Questions
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div className="event event--empty" />
            </div>
          ) : (
            <>
              <p className="user__empty-text">You've never boosted an event!</p>
              <Link href="/event/new">
                <Button>Boost an event</Button>
              </Link>
            </>
          )}
        </section>
      )}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Boost participation for your online events.
          </h1>
          <Link href="/how">
            <Button className="hero__cta">Learn how</Button>
          </Link>
        </div>
        <HomeIcon className="hero__icon" />
        <Curve className="hero__curve" />
      </section>
      <section className="feature">
        <div className="feature__image">
          <Reaction />
        </div>
        <div className="feature__content">
          <h2 className="feature__title">Live reactions</h2>
          <p className="feature__description">
            Simply click an emoji and send those presenters some love!
          </p>
          <Link href="/login">
            <Button>Try boost</Button>
          </Link>
        </div>
      </section>
      <section className="feature">
        <div className="feature__image">
          <Question />
        </div>
        <div className="feature__content">
          <h2 className="feature__title">Ask questions & create discussion</h2>
          <p className="feature__description">
            Don't lose track of question in the chat. Question that act like
            discussion threads, there when you need them.
          </p>
          <Link href="/login">
            <Button>Boost engagement</Button>
          </Link>
        </div>
      </section>
      <section className="feature">
        <div className="feature__image">
          <Penguins />
        </div>
        <div className="feature__content">
          <h2 className="feature__title">Give your event a boost!</h2>
          <p className="feature__description">
            Add engaging features to your existing event and bring your vibrant
            community together.
          </p>
          <Link href="/login">
            <Button>Gimmy a boost!</Button>
          </Link>
        </div>
      </section>
      <section className="resources">
        <div className="resources__pair">
          <div className="resource">
            <h2 className="resource__title">Watch how this was built</h2>
            <p className="resource__description">
              Check out how we built this site using Next.js and other awesome{" "}
              <a href="https://vercel.com">Vercel</a> tech.
            </p>
            <a href="">
              <Watch />
            </a>
          </div>
          <div className="resource">
            <h2 className="resource__title">
              Built & hosted on <a href="https://vercel.com">Vercel</a>
            </h2>
            <p className="resource__description">
              Deploy this app with the click of a button!
            </p>
            <a href="" onClick={DeployService.log}>
              <VercelDeploy />
            </a>
          </div>
        </div>
        <div className="resources__pair">
          <div className="resource">
            <h2 className="resource__title">
              Check us out on <a href="">Product Hunt</a>
            </h2>
            <p className="resource__description">
              Like what you see? Head over to Product Hunt and leave us a review
              and a vote!
            </p>
          </div>
          <div className="resource">
            <h2 className="resource__title">
              Read about how we built our auth flow
            </h2>
            <p className="resource__description">
              Checkout the <a href="">Vercel blog</a> to read how we build the
              auth flow for Boost.
            </p>
            <a href="">
              <Read />
            </a>
          </div>
        </div>
      </section>
      <style jsx>{`
        // RESOURCES
        .resource__title {
          font-size: 2rem;
        }

        .resource__description {
          padding-bottom: 1rem;
        }

        .resource {
          max-width: 525px;
          padding: 2rem 4rem;
        }

        .resources__pair {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .resources {
          width: 100vw;
          min-height: 100vh;
          background: var(--accent-1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        // FEATURES
        .feature__description {
          padding-bottom: 1rem;
        }

        .feature__title {
          font-size: 2rem;
        }

        .feature__content {
          margin: 0 1rem;
          max-width: 400px;
        }

        .feature__image {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          margin: 0 1rem;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature {
          background: var(--accent-1);
          width: 100vw;
          min-height: 100vh;
          padding: 2rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        // HERO
        :global(.hero__icon) {
          position: absolute;
          right: -5%;
          bottom: -20%;
          z-index: 1;
          transform: rotate(-45deg);
        }

        :global(.hero__curve) {
          position: absolute;
          bottom: 0;
          width: 100vw;
        }

        .hero__content {
          padding-bottom: 4rem;
        }

        .hero__content > :global(button) {
          padding: 1rem 2rem;
          font-size: 1.25rem;
        }

        .hero__title {
          font-size: 2rem;
          max-width: 550px;
          padding-bottom: 2rem;
        }

        .hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 120px);
          width: 100vw;
          padding: 0 1rem;
        }

        // USER
        .user__empty-text {
          padding-bottom: 1rem;
        }

        .events {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          width: 100vw;
          overflow-x: scroll;
        }

        .event {
          background: var(--background);
          border-radius: var(--border-radius);
          display: flex;
          flex-direction: column;
          padding: 0.5rem;
          min-width: 200px;
          margin: 0 1rem;
        }

        .event.event--empty {
          background: transparent;
          min-width: 0;
          margin: 0;
        }

        .event__title {
          font-size: 1rem;
          font-weight: bold;
        }

        .event__stats {
          display: flex;
          font-size: 0.75rem;
        }

        .event__stats > .stat {
          margin-right: 0.25rem;
        }

        .user {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          width: 100vw;
          background: var(--accent-1);
        }

        @media (min-resolution: 3dppx) {
          .hero__title {
            font-size: 2.75rem;
          }

          :global(.hero__icon) {
            bottom: -2.5%;
          }
        }

        @media screen and (min-width: 750px) {
          .resources__pair {
            flex-wrap: nowrap;
            justify-content: flex-start;
          }

          .feature__image {
            width: 30vw;
            height: 30vw;
            margin: 0 3rem;
          }

          .feature {
            flex-wrap: nowrap;
            min-height: 60vh;
          }

          .feature:nth-child(odd) {
            flex-direction: row-reverse;
          }

          .hero__title {
            font-size: 2.75rem;
          }

          :global(.hero__icon) {
            transform: rotate(0deg);
            bottom: -2.5%;
            right: 20%;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      deployCount: (await DeployService.getCount()) || 0,
    },
    unstable_revalidate: 60,
  };
}