import { StoreDTO } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";

const addStore = async (req, res) => {
  try {
    const { regionId, name, address, score } = req.body;

    const storeDTO = new StoreDTO(regionId, name, address, score);

    const newStore = await createStore(storeDTO);

    res.status(201).json(newStore);
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { addStore };
