#!/usr/bin/env bash
# PostToolUse hook: after Claude edits a spec, remind it to update the matching test cases.
file="$(jq -r '.tool_input.file_path // empty')"
case "$file" in
  */docs/specs/*.md)
    name="$(basename "$file" .md)"
    msg="You changed docs/specs/$name.md. Before finishing, update docs/test-cases/$name.md to match (run the write-test-cases skill with argument '$name'), then run docs/test-cases/check-sync.sh --update."
    jq -n --arg msg "$msg" '{hookSpecificOutput: {hookEventName: "PostToolUse", additionalContext: $msg}}'
    ;;
esac
exit 0
