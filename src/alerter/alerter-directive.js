angular.module('ua.alerter').directive('ovhAlert', ['$rootScope', function ($rootScope) {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            ovhAlert: '@'
        },
        transclude: true,
        templateUrl: 'components/ovh-utils-angular/alerter/alerter.html',
        link: function ($scope, $elm, $attr) {

            $scope.i18n = $rootScope.i18n;

            function checkForGlobalOrId (id) {
                return (!$scope.ovhAlert && !id) || ($scope.ovhAlert && id === $scope.ovhAlert);
            }

            $scope.$on('ovhAlert.show', function(event, type, message, details, alertId) {
                if (checkForGlobalOrId(alertId)) {
                    $scope.ovhAlertMessage = message;
                    $scope.ovhAlertMessageDetails = details;
                    $scope.ovhAlertType = type;
                }
            });

            $scope.$on('ovhAlert.resetMessage', function(event, alertId) {
                if (checkForGlobalOrId(alertId)) {
                    $scope.resetMessages();
                }
            });

            $scope.resetMessages = function () {
                $scope.ovhAlertMessage = null;
                $scope.ovhAlertMessageDetails = null;
            };

            if ($attr.ovhAlertHideRemoveButton !== undefined) {
                $scope.ovhAlertHideRemoveButton = true;
            }
        }
    };
}]);