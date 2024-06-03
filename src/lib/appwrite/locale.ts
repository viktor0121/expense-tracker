import { Client, Locale } from "appwrite";
import { ICurrency } from "@/lib/types";
import env from "@/lib/env";

export class LocaleService {
  client = new Client();
  locale;

  constructor() {
    this.client.setEndpoint(env.awProjectUrl).setProject(env.awProjectId);
    this.locale = new Locale(this.client);
  }

  async getLocalCurrency(): Promise<ICurrency | undefined> {
    try {
      // Fist get the users local currency code
      const locale = await this.locale.get();
      const currencyCode = locale.currency;
      if (!currencyCode) throw Error("No currency found");

      // Get list of all currencies
      const currenciesList = await this.locale.listCurrencies();
      const currencies = currenciesList.currencies;
      if (!currencies) throw Error("No currencies found2");

      // Find the currency that matches the users currency code and return it
      const currency = currencies.find((currency) => currency.code === currencyCode);
      return currency;
    } catch (error: any) {
      console.error("Appwrite :: getLocalCurrency() :: ", error);
      throw error;
    }
  }
}

const locale = new LocaleService();
export default locale;
