import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Cryptocurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
  cryptocurrencies: Cryptocurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptocurrencies: [], //agrega al state
    result: {} as CryptoPrice, // data del boton
    loading: false,

    // //     result: {
    // IMAGEURL: "",
    // PRICE: "",
    // HIGHDAY: "",
    // LOWDAY: "",
    // CHANGEPCT24HOUR: "",
    // LASTUPDATE: "",
    // // }, // data del boton

    //ACCIONES ASINCRONAS
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos();
      set(() => ({
        cryptocurrencies,
      }));
    },

    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));

      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({
        result,
        loading: false,
      }));
    },

    //
  }))
);
