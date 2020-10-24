using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using static Google.Apis.Sheets.v4.SpreadsheetsResource.ValuesResource;

namespace Model
{
    public class GoogleSheet
    {
        private readonly string[] _Scopes = { SheetsService.Scope.Spreadsheets };
        private const string _SpreadsheetId = "1B3dsSNos_aQcFJIyYvFiBZdrA7T1rtGiHbfDscgRKBw";
        private const string _GoogleCredentialsFileName = "google-credentials.json";
        private static readonly string _sheet = "Sheet1";
        private string _Range = $"{_sheet}!A:B";

        private SheetsService GetSheetsService()
        {            
            using (var stream = new FileStream(_GoogleCredentialsFileName, FileMode.Open, FileAccess.Read))
            {
                var serviceInitializer = new BaseClientService.Initializer
                {
                    HttpClientInitializer = GoogleCredential.FromStream(stream).CreateScoped(_Scopes)
                };

                return new SheetsService(serviceInitializer);
            }
        }

        private async Task ReadAsync(SpreadsheetsResource.ValuesResource valuesResource)
        {
            var response = await valuesResource.Get(_SpreadsheetId, _Range).ExecuteAsync();
            var values = response.Values;

            if (values == null || !values.Any())
            {
                return;
            }

            var header = string.Join(" ", values.First().Select(r => r.ToString()));

            foreach (var row in values.Skip(1))
            {
                var res = string.Join(" ", row.Select(r => r.ToString()));
            }
        }

        private void CreateEntry(List<object> datas) 
        { 
            ValueRange valueRange = new ValueRange() { Values = new List<IList<object>> { datas } };

            var appendRequest = GetSheetsService().Spreadsheets.Values.Append(valueRange, _SpreadsheetId, _Range);
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendReponse = appendRequest.Execute();
        }

        private void UpdateEntry(List<object> datas)
        {
            ValueRange valueRange = new ValueRange() { Values = new List<IList<object>> { datas }};

            UpdateRequest updateRequest = GetSheetsService().Spreadsheets.Values.Update(valueRange, _SpreadsheetId, _Range);
            updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.USERENTERED;
            UpdateValuesResponse appendReponse = updateRequest.Execute();
        }

        private void DeleteEntry()
        {
            var requestBody = new ClearValuesRequest();

            var deleteRequest = GetSheetsService().Spreadsheets.Values.Clear(requestBody, _SpreadsheetId, _Range);
            var deleteReponse = deleteRequest.Execute();
        }
    }
}