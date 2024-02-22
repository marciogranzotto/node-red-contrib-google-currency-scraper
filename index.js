module.exports = function(RED) {

  function GoogleCurrencyScraperNode(config) {
      RED.nodes.createNode(this, config);
      var node = this;
      node.on('input', async function(msg) {
          const { default: googleCurrencyScraper, CurrencyCode } = await import('google-currency-scraper');
          const fromCurrency = msg.payload.from || config.from;
          const toCurrency = msg.payload.to || config.to;

          try {
              const currency = await googleCurrencyScraper({
                  from: fromCurrency,
                  to: toCurrency
              });
              msg.payload = currency; // Attach the conversion result to the payload
              node.send(msg);
          } catch(error) {
              node.error("Error fetching currency data: " + error.message, msg);
          }
      });
  }
  RED.nodes.registerType("google-currency", GoogleCurrencyScraperNode);
};
