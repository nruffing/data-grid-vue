import MOCK_DATA from "./MOCK_DATA";
import type { TestDataItem } from "./test-data";

export default {
  getAll(): TestDataItem[] {
    return MOCK_DATA
  }
}