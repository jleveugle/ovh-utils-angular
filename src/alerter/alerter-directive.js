export default function () {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            ovhAlert: '@'
        },
        transclude: true,
        template: require('./alerter.html'),
        link: function ($scope, $elm, $attr) {

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
};
