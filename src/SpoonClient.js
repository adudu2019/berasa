import SpoonacularApi from "spoonacular_api";
var defaultClient = SpoonacularApi.ApiClient.instance;
var apiKeyScheme = defaultClient.authentications["apiKeyScheme"];
apiKeyScheme.apiKey = "a143f78433c14c13895ada7df55a3789";
export const api = new SpoonacularApi.DefaultApi();
