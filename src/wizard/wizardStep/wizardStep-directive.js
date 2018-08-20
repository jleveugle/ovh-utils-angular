export default /* @ngInject */ function ($compile, $timeout, $q) {
    'use strict';
    return {
        restrict: 'A',
        require: '^wizard',
        transclude: true,
        template: require('./wizardStep.html'),
        scope: true,
        compile: function () {
            return {
                pre : function ($scope, $elem, $attr) {

                    $scope.onLoad = $attr.wizardStepOnLoad && angular.isFunction($scope.$eval($attr.wizardStepOnLoad)) ? $scope.$eval($attr.wizardStepOnLoad) : angular.noop;

                    $scope.onPrevious = $attr.wizardStepOnPrevious && angular.isFunction($scope.$eval($attr.wizardStepOnPrevious)) ? $scope.$eval($attr.wizardStepOnPrevious) : angular.noop;

                    $scope.onNext = $attr.wizardStepOnNext && angular.isFunction($scope.$eval($attr.wizardStepOnNext)) ? $scope.$eval($attr.wizardStepOnNext) : angular.noop;

                    if ($attr.wizardStepValid) {
                        $scope.stepValid = !!$scope.$eval($attr.wizardStepValid);

                        $scope.$watch($attr.wizardStepValid, function (newValue) {
                            $scope.stepValid = newValue;
                        }, true);

                    } else {
                        $scope.stepValid = true;
                    }

                },
                post: function ($scope, $elem, $attr, $wizardCtrl) {
                    $scope.stepNumber = $wizardCtrl.steps.length + 1;

                    var modalHelp = $('#modal-help'),
                        helpTrigger = $('#wizard-step-content-help-' + $scope.stepNumber),
                        foundElements = $elem.find('*[data-wizard-step-help], *[wizard-step-help]'),
                        modalContainer = $('#modal-container'),
                        wizardContentHelp = $('#wizard-step-content-help'),
                        horizontalOffsetTime = 350,
                        verticalOffsetTime = 350,
                        helpMinSize = 300,
                        modalToHelpOffset = 43;

                    modalHelp.height(0);
                    if ($scope.stepNumber === 1) {
                        $('.wizard-container').delegate('.helpTrigger', 'click', function () {
                            helpTrigger = $(this);
                            $scope.changeHelp();
                        });
                    }

                    $scope.foundElements = foundElements.length;
                    $scope.hasHelp = function () {
                        return $scope.foundElements > 0;
                    };

                    $scope.helpStateChanging = false;
                    $scope.changeHelp = function () {

                        if(!$scope.helpStateChanging) {

                            $scope.helpStateChanging = true;
                            $scope.showHelp = !$scope.showHelp;

                            if($scope.showHelp) {
                                $timeout(function() {
                                    modalHelp.addClass('open');
                                    helpTrigger.addClass('open');
                                    var helpSize = modalContainer.height() - modalToHelpOffset;
                                    if(helpSize < helpMinSize) {
                                        helpSize = helpMinSize;
                                    }
                                    modalHelp.height(helpSize);
                                    $scope.helpStateChanging = false;
                                }, horizontalOffsetTime);
                            }
                            else {
                                $timeout(function() {
                                    modalHelp.removeClass('open');
                                    helpTrigger.removeClass('open');
                                    $scope.helpStateChanging = false;
                                    modalHelp.height(0);
                                }, verticalOffsetTime);
                            }
                        }
                    };

                    $scope.initHelper = function () {
                        helpTrigger = $('#wizard-step-content-help-' + $scope.stepNumber);

                        $scope.showHelp = false;
                        modalHelp.removeClass('open');
                        helpTrigger.removeClass('open');

                        foundElements.css('display', 'none');
                        var helpToCopy = foundElements.clone();
                        helpToCopy.css('display', '');
                        helpToCopy.addClass('help4wizards-container');

                        $compile(helpToCopy)($scope);

                        modalHelp.empty();
                        modalHelp.append(helpToCopy);
                        modalHelp.height(wizardContentHelp.height());
                    };

                    $scope.resetHelper = function () {
                        modalHelp.css('display', 'none');
                        $scope.showHelp = true;
                        $timeout(function() {
                            modalHelp.css('display', '');
                        }, horizontalOffsetTime + verticalOffsetTime);
                        $scope.changeHelp();
                    };

                    $wizardCtrl.addStep($scope);

                    $scope.getCurrentStep = function () {
                        return $wizardCtrl.currentStep;
                    };

                    $scope.loadStep = function () {
                        $scope.onLoad();
                    };

                    $scope.previousStep = function () {
                        $scope.resetHelper();
                        $wizardCtrl.previousStep();
                        $scope.onPrevious();
                    };

                    $scope.nextStep = function () {
                        if ($attr.wizardStepOnNextStepValidPromise && angular.isFunction($scope[$attr.wizardStepOnNextStepValidPromise])) {
                            $q.when($scope[$attr.wizardStepOnNextStepValidPromise]()).then(function () {
                                $scope.resetHelper();
                                $scope.onNext();
                                $wizardCtrl.nextStep();
                            }, function () {
                                // Nothing to do
                            });
                        } else {
                            $scope.resetHelper();
                            $scope.onNext();
                            $wizardCtrl.nextStep();
                        }
                    };

                    if ($scope.stepNumber === 1) {
                        $wizardCtrl.nextStep();
                    }

                    $scope.redirectFocus = function(e) {
                        console.log(e);
                    };

                }//End post
            };//End return
        }
    };
};
