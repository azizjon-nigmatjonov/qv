import Slider from 'react-slick'
import { Header, MuiTabs } from '../../../components'
import Stepper from '../../../components/Stepper'
import { hoc } from '../../../utils/hoc'
import { FourthStepContainer, SliderContextProvider, ThirdStepContainer } from '../OperatorContainers'
import { FirstStep, FourthStep, SecondStep, ThirdStep } from './steps'
import { useOperatorSteppersProps } from './useOperatorSteppersProps'

export const OperatorSteppers = hoc(
  useOperatorSteppersProps,
  ({
    title,
    getSteps,
    current,
    scrollToPassedEl,
    settings,
    sliderRef,
    isJuridic,
    register,
    scrollToNext,
    tabElements,
    activeTab,
    setActiveTab,
    showThirdStep = true,
    isAdmin,
    reset,
    showFourthStep = true,
    claimData,
    claimStatus,
    getValues,
    inspector,
    inspectorComment,
    isInspectionBoss,
    blocks,
    isMonitored,
    roleId,
    scrollToEl,
    getClaimByIdQuery,
    isHistory,
    handleSubmit,
    errors,
    control,
  }) => {
    return (
      <SliderContextProvider
        isJuridic={isJuridic}
        register={register}
        control={control}
        scrollToNext={scrollToNext}
        reset={reset}
        isAdmin={isAdmin}
        showFourthStep={showFourthStep}
        showThirdStep={showThirdStep}
        claimData={claimData}
        claimStatus={claimStatus}
        getValues={getValues}
        inspector={inspector}
        inspectorComment={inspectorComment}
        isInspectionBoss={isInspectionBoss}
        blocks={blocks}
        isMonitored={isMonitored}
        roleId={roleId}
        scrollToEl={scrollToEl}
        getClaimByIdQuery={getClaimByIdQuery}
        isHistory={isHistory}
        handleSubmit={handleSubmit}
        errors={errors}
      >
        <div className="h-screen">
          <Header
            title={title}
            backLink={-1}
            // centerElement={
            //   isJuridic && <MuiTabs elements={tabElements} activeTab={activeTab} setActiveTab={setActiveTab} />
            // }
          />
          <div className="sidebar-header-calc">
            <div className="bg-white rounded-md p-6 mb-4">
              <Stepper steps={getSteps()} current={current} scrollToEl={scrollToPassedEl} />
            </div>
            <div className="h-fit overflow-auto">
              <Slider className="overflow-auto" {...settings} ref={sliderRef} adaptiveHeight={true}>
                <FirstStep />
                <SecondStep />
                <ThirdStepContainer showThirdStep={showThirdStep}>
                  <ThirdStep />
                </ThirdStepContainer>
                <FourthStepContainer showFourthStep={showFourthStep}>
                  <FourthStep />
                </FourthStepContainer>
              </Slider>
            </div>
          </div>
        </div>
      </SliderContextProvider>
    )
  }
)
