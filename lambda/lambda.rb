require 'json'
require 'googleauth'
require 'google/apis/drive_v3'

def handler(event:, context:)
  drive = Google::Apis::DriveV3::DriveService.new
  drive.authorization = auth(ENV['GOOGLE_CLIENT_EMAIL'], ENV['GOOGLE_PRIVATE_KEY'])

  file_id = event['queryStringParameters']['file_id']
  file = drive.get_file(file_id, download_dest: '/tmp/file.csv')
  content = File.read('/tmp/file.csv')
  
  return {
    statusCode: 200,
    body: JSON.generate({
      content: content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
end

def auth(email, key)
  sio = StringIO.new({client_email: email, private_key: key.gsub(/\\n/, "\n")}.to_json)
  ::Google::Auth::ServiceAccountCredentials.make_creds(scope: 'https://www.googleapis.com/auth/drive', json_key_io: sio)
end