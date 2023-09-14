import React, { useEffect, useState } from 'react'
import PT from 'prop-types'


export default function ArticleForm(props) {
 
  const initialFormValues = { title: '', text: '', topic: '' }


  // ✨ where are my props? Destructure them here

  const {setCurrentArticleId, currentArticleId, postArticle, articleFormValues, setArticleFormValues, editMode, updateArticle, setEditMode} = props;



  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
  })

  const onChange = evt => {
    const { id, value } = evt.target
    setArticleFormValues({ ...articleFormValues, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    if(!editMode){
    postArticle(articleFormValues)
   
    
    } else {
     
    updateArticle(currentArticleId,articleFormValues)
      
    }
    
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
  }

  const isDisabled = () => {
    const a = articleFormValues;
    if  (a.title.trim().length >= 1
    && a.text.trim().length >=1 ){
      return false
    }
     return true
    // ✨ implement
    // Make sure the inputs have some values
    
  }

  const handleDelete = () => {

    setArticleFormValues(initialFormValues)
    setEditMode(false)
    setCurrentArticleId("")
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{editMode ? "Edit" : "Create" } Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={articleFormValues.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={articleFormValues.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={articleFormValues.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        {editMode && <button disabled={isDisabled(!editMode)} onClick={handleDelete}>Cancel edit</button> }
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
