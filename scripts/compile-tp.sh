#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
for tool in pandoc xelatex; do
  command -v "$tool" >/dev/null || { echo "Outil requis : $tool" >&2; exit 1; }
done
build_dir=$(mktemp -d "${TMPDIR:-/tmp}/tp-latex.XXXXXX")
trap 'rm -rf "$build_dir"' EXIT
pandoc Tp.md -s --pdf-engine=xelatex -V lang=fr -V papersize=a4 \
  -V fontsize=10pt -V geometry:margin=1.8cm -o Tp.tex
for pass in 1 2 3; do
  if ! xelatex -interaction=nonstopmode -halt-on-error \
    -output-directory="$build_dir" Tp.tex > "$build_dir/compile.log" 2>&1; then
    cat "$build_dir/compile.log" >&2
    exit 1
  fi
done
cp "$build_dir/Tp.pdf" Tp.pdf
echo 'Tp.tex et Tp.pdf générés depuis Tp.md.'
