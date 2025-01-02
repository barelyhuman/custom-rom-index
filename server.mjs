import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fastifyStatic from "@fastify/static";
import fastify from "fastify";
import { h } from "preact";
import { renderToString } from "preact-render-to-string";

const app = fastify({ logger: true });

const __dirname = dirname(fileURLToPath(import.meta.url));

app.register(fastifyStatic, {
  root: path.join(__dirname, "out/client"),
  prefix: "/client",
});

async function mapComponent(path, req, res) {
  const appFile = await import("./out/_app.js");
  const Component = await import(path);
  let pageProps = {
    props: {},
  };
  if ("getServerSideProps" in Component) {
    Object.assign(
      pageProps,
      await Component.getServerSideProps({
        request: req,
        response: res,
        query: req.query,
      })
    );
  }
  const mod = "default" in appFile ? appFile.default : appFile;
  const FinalComponent = () =>
    h(mod, {
      Component: Component.default,
      pageProps: pageProps.props,
    });
  const toString = renderToString(h(FinalComponent));
  console.log(toString);
  return toString
    .replace(
      /<\/head\>/,
      '<link rel="stylesheet" href="/client/_app.css"></head>'
    )
    .replace(
      /<\/body\>/,
      `<script type="module" src="/client/${path.replace(
        "./out/",
        ""
      )}"></script>
    <script type="application/json" id="pageProps">${JSON.stringify(
      pageProps.props
    )}</script>
</body>`
    );
}

app.get("/", async (req, res) => {
  res.header("content-type", "text/html");
  return mapComponent("./out/index.js", req, res);
});

app.get("/devices", async (req, res) => {
  res.header("content-type", "text/html");
  return mapComponent("./out/devices.js", req, res);
});

app.get("/submit-rom", async (req, res) => {
  res.header("content-type", "text/html");
  return mapComponent("./out/submit-rom.js", req, res);
});

await app.listen({ host: "0.0.0.0", port: 3000 });
