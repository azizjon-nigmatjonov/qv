import { useState } from 'react'

import { Card } from '../../../components'
import requestPhotoUpload from '../../../services/requestPhotoUpload'
import FormElementComp from './formElement'
import { useCanvas } from '../../../services/useCanvas'

export function MonitoringForm({ questions, changeAnswer, getQuestionById }) {
  const [progress, setProgress] = useState(false)
  const [uploadingItem, setUploadingItem] = useState('')
  const { canvasMutation } = useCanvas({})
  const onFileUploadChange = (event, item, question) => {
    console.log(event)
    setUploadingItem(item.id)
    requestPhotoUpload({
      event,
      setProgress,
      onChange: (url) =>
        changeAnswer({
          questionId: item.id,
          description: question.description,
          yes: false,
          no: true,
          images: [...question.images, url],
        }),
    })
  }
  const onTakePhoto = (imgString, item, question) => {
    setUploadingItem(item.id)
    canvasMutation.mutate({
      data: imgString.split('base64,')[1],
    }, {
      onSuccess: (data) => {
        changeAnswer({
          questionId: item.id,
          description: question.description,
          yes: false,
          no: true,
          images: [...question.images, data?.data?.data?.file],
        })
        setUploadingItem('')
      }
    })
  }
  return (
    <Card title="To'ldiriladigan umumiy talablar (cheklist)" bodyClassName="p-0">
      {questions?.map((item, index) => {
        const question = getQuestionById(item.id)
        return (
          <FormElementComp
            item={item}
            index={index}
            changeAnswer={changeAnswer}
            question={question}
            onFileUploadChange={onFileUploadChange}
            progress={progress}
            uploadingItem={uploadingItem}
            onTakePhoto={onTakePhoto}
          />
        )
      })}
    </Card>
  )
}
