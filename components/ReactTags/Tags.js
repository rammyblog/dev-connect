import React, { Component } from "react"
import { render } from "react-dom"
// import { COUNTRIES } from "./countries"

import { WithContext as ReactTags } from "react-tag-input"

// const suggestions = COUNTRIES.map((country) => {
//   return {
//     id: country,
//     text: country,
//   }
// })

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

class Tags extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: this.props.skills,
      suggestions: suggestions,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
  }
  componentDidMount() {
    this.setState({ tags: this.props.skills })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.skills.length !== this.state.tags.length) {
      this.props.handleTagChange(this.state.tags)
    }
  }

  handleDelete(i) {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    })
  }

  handleAddition(tag) {
    this.setState((state) => ({ tags: [...state.tags, tag] }))
  }

  // handleDrag(tag, currPos, newPos) {
  //   const tags = [...this.state.tags]
  //   const newTags = tags.slice()

  //   newTags.splice(currPos, 1)
  //   newTags.splice(newPos, 0, tag)

  //   // re-render
  //   this.setState({ tags: newTags })
  // }

  handleTagClick(index) {
    console.log("The tag at index " + index + " was clicked")
  }

  render() {
    const { tags, suggestions } = this.state
    return (
      <div>
        <ReactTags
          tags={tags}
          // suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          // handleDrag={this.handleDrag}
          handleTagClick={this.handleTagClick}
        />
      </div>
    )
  }
}

export default Tags
