
declare let global: any;
global.onFromSubmit = (e: GoogleAppsScript.Events.FormsOnFormSubmit) => {
  const formResponse =  e.response.getItemResponses().find(res => res.getItem().getTitle() === 'csv')
  if (!formResponse) {
    return;
  }

  const answer = {
    title: formResponse.getItem().getTitle(),
    type: formResponse.getItem().getType().toString(),
    values: formResponse.getResponse()
  };
  console.log('answer', answer);

  const url = PropertiesService.getScriptProperties().getProperty('LAMBDA_URL');
  if (!url) {
    return;
  }

  const path = `${url}/?file_id=${answer.values[0]}`;
  console.log('path', path);
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'get',
    contentType: 'application/json'
  };
  const response = UrlFetchApp.fetch(path, options);
  console.log('result', response.getContentText());
};

const extractFileIdFromUrl = (url: string) => {
  const match = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/.exec(url);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}