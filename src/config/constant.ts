export class Constant {
  static get COMMA(): string {
    return ',';
  }

  static get LIST(): string {
    return 'list';
  }

  static get ALL(): string {
    return 'All';
  }

  static get LAUNCH(): string {
    return 'launch';
  }

  static get FETCH(): string {
    return 'fetch';
  }

  static get EMPTY(): string {
    return '';
  }

  static get NOT_AVAILABLE(): string {
    return 'NA';
  }

  static get ZERO(): number {
    return 0;
  }

  static get ISSUE_DATE_NO_FORMAT(): string {
    return 'DDMMYY';
  }

  static get HYPHEN(): string {
    return '-';
  }

  static get UNDERSCORE(): string {
    return '_';
  }

  static get ASSET(): string {
    return 'Asset';
  }

  static get WEB_APPLICATION(): string {
    return 'Web Application';
  }

  
  static get SUCCESS_STATUS(): string {
    return 'Success';
  }

  static get FAILED_STATUS(): string {
    return 'Failed';
  }

  static get INSIDE_LOG(): string {
    return 'Inside the method';
  }

  static get VERIFY_TOKEN(): string {
    return 'Verifying token for route ';
  }

  static get VERIFIED_TOKEN(): string {
    return 'Token verified for route ';
  }

  static get TOKEN_REFRESHED_SUCCESS(): string {
    return 'Token refreshed successfully';
  }

  static get APP_START_LOG(): string {
    return 'Started application on port ';
  }

  static get LOGIN_SUCCESS(): string {
    return 'Login is success';
  }

  static get LOGOUT_SUCCESS(): string {
    return 'Logout is success';
  }

  static get UNHANDLED_ERROR(): string {
    return 'Got unhandled error :: Error Detail :: ';
  }

  static get LOGIN_FAILED(): string {
    return 'Login Failed';
  }

  static get FINISH_LOG(): string {
    return 'Finished method';
  }

  static get DATE_FULL_FORMAT(): string {
    return 'MMMM Do YYYY, h:mm:ss a';
  }

  static get REPORT_DATE_FORMAT(): string {
    return 'DD.MM.yyyy_HH.mm.ss';
  }

  static get DELAY_IN_MS(): number {
    return 5 * 60 * 1000;
  }

  

  static get ENV_FILE(): string[] {
    return 'db,log,mail,app,proxy'
      .split(Constant.COMMA)
      .map((val) => `./config/${val}.env`);
  }

  static get SURVEY_STATUS_SCHEDULED(): number {
    return 1;
  }

  static get SURVEY_STATUS_STARTED(): number {
    return 2;
  }

  static get SURVEY_STATUS_COMPLETED(): number {
    return 3;
  }

  static get APP_CONSTANT(): any {
    return {
      ZERO: 0,
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
      SEVEN: 7,
      EIGHT: 8,
      NINE: 9,
      TEN: 10,
      TWO_HUNDRED: 200,
      FIVE_HUNDRED: 500,
      UNAUTHORIZED_ACCESS             : "Unauthorized Access",        // Fail case of Role authentication
      INVALID_SESSION                 : "Invalid Session",            // Fail case of Token authentication
      UNABLE_TO_FETCH                 : "Unable to fetch",            // Case: No record found.
      DATA                            : "data",
      FRAMEWORK                       : "framework",
      AD_EEROR_CODE_WORNG_CRDENTIALS  : "AcceptSecurityContext error",
      TRUE                            : true,
      FALSE                           : false,
      NULL                            : null,
      UNDEFINED                       : undefined,
      TOKEN_EXPIRY_TIME_IN_MINUTES    : 20,
      SIXTY_SECONDS                   : 60,
      ENCRYPTION_SEPARATOR            : '-',
      
    };
  }

  static APP_MESSAGES(functionName): string {
    const messages = {
      "getSurveys": "Surveys listed successfully",
      "getSurvey": "Survey listed successfully",
      "addSurvey": "Survey created successfully",
      "updateSurvey": "Survey updated successfully",
      "startSurvey": "Survey started successfully",
      "completeSurvey": "Survey completed successfully",
      "getSurveyProgress": "Survey progress listed successfully",
      "detailedSurveyStatus": "Survey detailed status listed successfully",
      "getSurveyStatuses": "Survey statuses listed successfully",
      "getSurveyResults": "Survey results listed successfully",
      "getMemberSurveyResponse": "Survey responses listed successfully",
      "addResponseComments": "Survey comment addedd successfully",
      "getResponseComments": "Survey response comments listed successfully",
      "getMetrics": "Metrics listed successfully",
      "getMetric": "Metric listed successfully",
      "addMetric": "Metric created successfully",
      "getMetricId": "Metric code fetched successfully",
      "getPreviewQuestions": "Preview questions listed successfully",
      "getFormData": "Metric form data listed successfully",
      "addMetricResponse": "Metric response addedd successfully",
      "getDataPoints": "Data points listed successfully",
      "deleteMetric": "Metric deleted successfully"
    }

    return messages[functionName]
  }

  static get VALIDATION_ERROR_MSG(): string {
    return 'Input data validation failed';
  }

  static UPLOAD_FILE_PATH(upload_type): string {
    const upload_paths =  {
      METRIC: "./uploads/metrics"
    };
    return upload_paths[upload_type]
  }
}
