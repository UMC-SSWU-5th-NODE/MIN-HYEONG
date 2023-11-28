import { Store } from "../models/store.model.js";

const createStore = async (storeDTO) => {
  try {
    const { regionId, name, address, score } = storeDTO;

    const newStore = await Store.create({
      region_id: regionId,
      name,
      address,
      score,
    });

    return newStore;
  } catch (error) {
    console.error("Error creating store:", error);
    throw error;
  }
};

export { createStore };
