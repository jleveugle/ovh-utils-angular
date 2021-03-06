export default /* @ngInject */ function ($scope, $translate) {
    'use strict';

    var initialized = false,
    currentStep;

    $scope.steps = [];
    $scope.currentStep = undefined;

    $scope.confirmButton = true;
    $scope.cancelButton = true;
    $scope.wizardConfirmButtonText = $translate.instant('wizard_confirm');
    $scope.wizardCancelButtonText = $translate.instant('wizard_cancel');

    $scope.onFinish = angular.noop;
    $scope.onCancel = angular.noop;

    this.initWatcher = function () {
        initialized = true;
        this.checkStepShow();
    };

    // Watcher
    this.checkStepShow = function () {
        if (!initialized) {
            return;
        }
        currentStep = undefined;

        angular.forEach($scope.steps, function (step, count) {
            if (currentStep !== undefined) {
                if (count > currentStep) {
                    step.stepShown = false;
                }
            } else {
                step.stepShown = true;
                if (!step.stepValid) {
                    currentStep = count;
                }
            }
        });
        $scope.currentStep = currentStep;
        if (currentStep === undefined) {
            $scope.stepFormValid = true;
        } else {
            $scope.stepFormValid = false;
        }
    };

    this.addStep = function (step) {
        $scope.steps.push(step);
    };

    this.getStepCount = function () {
        return $scope.steps.length;
    };

    /**
     * Buttons
     */

    this.setConfirmButton = function (value) {
        $scope.confirmButton = value;
    };

    this.setCancelButton = function (value) {
        $scope.cancelButton = value;
    };

    this.setWizardFormConfirmButtonText = function (value) {
        $scope.wizardConfirmButtonText = value;
    };

    this.setWizardFormCancelButtonText = function (value) {
        $scope.wizardCancelButtonText = value;
    };
};
