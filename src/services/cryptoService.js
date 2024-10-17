import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, params, retries = 3, delay = 1000) => {
  try {
    console.log(`Fazendo requisição para: ${url}`);
    const response = await axios.get(url, { params });
    console.log(`Resposta recebida de: ${url}`);
    return response.data;
  } catch (error) {
    console.error(`Erro na requisição para: ${url}`, error);
    if (retries > 0 && error.response && error.response.status === 429) {
      console.log(`Limite de taxa atingido. Tentando novamente em ${delay}ms...`);
      await sleep(delay);
      return fetchWithRetry(url, params, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const getCryptoData = async (limit = 6) => {
  console.log(`Iniciando getCryptoData com limite: ${limit}`);
  const cacheKey = `cryptoData_${limit}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    console.log('Retornando dados do cache');
    return cachedData.data;
  }

  try {
    console.log('Buscando dados do mercado');
    const marketData = await fetchWithRetry(`${BASE_URL}/coins/markets`, {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: false,
    });

    // Removendo a chamada para dados OHLC, pois estava causando problemas de CORS
    const data = marketData.map((crypto) => ({
      ...crypto,
      // ohlc: [] // Removido temporariamente
    }));

    cache.set(cacheKey, { data, timestamp: Date.now() });
    console.log('Dados obtidos e cacheados com sucesso');
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados das criptomoedas:', error);
    throw error;
  }
};

export const searchCryptos = async (query) => {
  const cacheKey = `search_${query}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  try {
    const searchResults = await fetchWithRetry(`${BASE_URL}/search`, { query });
    const detailedResults = await Promise.all(
      searchResults.coins.slice(0, 5).map(async (coin) => {
        try {
          const details = await fetchWithRetry(`${BASE_URL}/coins/${coin.id}`, {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
          });
          // Removendo a chamada para dados OHLC
          return {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: details.image.small,
            current_price: details.market_data.current_price.usd,
            price_change_percentage_24h: details.market_data.price_change_percentage_24h,
            market_cap: details.market_data.market_cap.usd,
            total_volume: details.market_data.total_volume.usd,
            market_cap_rank: details.market_cap_rank,
            // ohlc: [] // Removido temporariamente
          };
        } catch (error) {
          console.error(`Erro ao buscar detalhes para ${coin.id}:`, error);
          return null;
        }
      })
    );

    const validResults = detailedResults.filter(result => result !== null);
    cache.set(cacheKey, { data: validResults, timestamp: Date.now() });
    return validResults;
  } catch (error) {
    console.error('Erro ao buscar criptomoedas:', error);
    throw error;
  }
};