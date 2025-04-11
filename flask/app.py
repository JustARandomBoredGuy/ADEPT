from flask import Flask, jsonify
import os

app = Flask(__name__)
CWD = os.getcwd()
target_path = os.path.join(CWD, "..", "backend", "src", "constants", "rawData")
final_path = os.path.abspath(target_path)
print(CWD)

@app.route("/")
def helloeWorld():
    return jsonify({"Res": 200})

@app.route("/getNotes")
def getNotesFromClassroom():
    import os.path
    import os
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    from googleapiclient.discovery import build
    import io
    from googleapiclient.http import MediaIoBaseDownload

    SCOPES = [  
            'https://www.googleapis.com/auth/classroom.courses.readonly',
            'https://www.googleapis.com/auth/classroom.announcements.readonly',
            'https://www.googleapis.com/auth/drive.readonly',
            'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
            'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly'
    ]

    def init():
        try:
            creds = None
            if os.path.exists("token.json"):
                creds = Credentials.from_authorized_user_file("token.json", SCOPES)
            # If there are no (valid) credentials available, let the user log in.
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                            "credentials.json", SCOPES
                    )
                    creds = flow.run_local_server(port=0)
                # Save the credentials for the next run
                with open("token.json", "w") as token:
                    token.write(creds.to_json())  
            print("OAUTH DONE")
            return creds
        except Exception as err:
            return err

    def downloadFile(drive_service, fileName, fileId):

        print("NOTES doenload begin")
        request = drive_service.files().get_media(fileId=fileId)
        print("../")
        fh = io.FileIO(os.path.join(final_path,fileName), 'wb')
        downloader = MediaIoBaseDownload(fh, request)

        done = False
        while done is False:
                status, done = downloader.next_chunk()
                print(f"  🔽 Downloaded {int(status.progress() * 100)}%")
        print("NOTES doenload done")

    def isPresent(fileName):
        for file in os.listdir(final_path):
            if file == fileName:
                return True
        return False

    def main():
        """Shows basic usage of the Classroom API.
        Prints the names of the first 10 courses the user has access to.
        """
        try:
            creds = init()
            service = build("classroom", "v1", credentials=creds)
            drive_service = build("drive", "v3", credentials=creds)

            # Call the Classroom API
            results = service.courses().list().execute()
            courses = results.get("courses", [])

            print("GOt the COurses")
            if not courses:
                print("No courses found.")
                return
            print("Courses:")
            for course in courses:
                    course_id = course["id"]
                    print(course["name"])
                    announcements = service.courses().announcements().list(courseId=course_id).execute()
                    items = announcements.get('announcements', [])
                    print("Got the anncouncements")
                    for item in items:
                        for material in item.get("materials", []):
                            if "driveFile" in material:
                                    
                                    print("Got the files")
                                    fileInfo = material["driveFile"]["driveFile"]
                                    fileId = fileInfo["id"]
                                    fileName = fileInfo["title"]

                                    if not isPresent(fileName):
                                        downloadFile(drive_service, fileName, fileId)
                                        print("File Downloaded")
                                    else:
                                        print(f'{fileName} skipped as it is already installed!')
        except HttpError as error:
            print(f"An error occurred: {error}")
            return error
    try:
        main()
        return jsonify({"statusCode": 200, 'body': "Successfully installed notes"})
    except Exception as err:
        print(err)
        return jsonify({"statusCode":404, "body": "Error in installing notes"})
