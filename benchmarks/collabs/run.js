import {
  runBenchmarks,
  writeBenchmarkResultsToFile,
} from "../../js-lib/index.js";
import { CollabsFactory } from "./factory.js";

(async () => {
  await runBenchmarks(new CollabsFactory(), (testName) => true); // !testName.startsWith('[B4x'))
  writeBenchmarkResultsToFile("../results.json", (testName) => true);
})();
