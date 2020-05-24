import { Tag, Input, Tooltip } from "antd"
import { PlusOutlined } from "@ant-design/icons"

class EditableTagGroup extends React.Component {
  state = {
    tags: this.props.skills,
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  }

  componentDidMount() {
    console.log(this.state.tags, this.props.skills)

    this.setState({ tags: this.props.skills })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.skills.length !== this.state.tags.length) {
      this.props.handleTagChange(this.state.tags)
    }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = (e) => {
    if (e.keyCode === 188 || e.keyCode === 13) {
      const { inputValue } = this.state
      let { tags } = this.state
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: "",
      })

      console.log(this.state.tags)
    }
  }

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value })
  }

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags]
      newTags[editInputIndex] = editInputValue

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      }
    })
  }

  saveInputRef = (input) => (this.input = input)

  saveEditInputRef = (input) => (this.editInput = input)

  render() {
    const {
      tags,
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state

    return (
      <div className="skills">
        {tags && tags.length > 0
          ? tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={this.saveEditInputRef}
                    key={tag}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={this.handleEditInputChange}
                    onBlur={this.handleEditInputConfirm}
                    onPressEnter={this.handleEditInputConfirm}
                  />
                )
              }

              const isLongTag = tag.length > 20

              const tagElem = (
                <Tag
                  className="edit-tag skill-tag m-half"
                  color="success"
                  key={tag}
                  closable={index !== -1}
                  onClose={() => this.handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== -1) {
                        this.setState(
                          { editInputIndex: index, editInputValue: tag },
                          () => {
                            this.editInput.focus()
                          }
                        )
                        e.preventDefault()
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              )
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              )
            })
          : null}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            // onPressEnter={this.handleInputConfirm}
            onKeyDown={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            className="site-tag-plus"
            color="success"
            onClick={this.showInput}
          >
            <PlusOutlined /> New Skill
          </Tag>
        )}
      </div>
    )
  }
}

// ReactDOM.render(<EditableTagGroup />, mountNode)

export default EditableTagGroup
