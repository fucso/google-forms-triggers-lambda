
declare let global: any;
global.onFromSubmit = (e: GoogleAppsScript.Events.FormsOnFormSubmit) => {
  const answers =  e.response.getItemResponses().map(res => {
    return {
      title: res.getItem().getTitle(), 
      type: res.getItem().getType().toString(),
      values: res.getResponse() 
    };
  }).filter(v => v);

  console.log(answers);
};

const extractFileIdFromUrl = (url: string) => {
  const match = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/.exec(url);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}