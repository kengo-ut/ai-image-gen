.PHONY: dev

_isort_check:
	uv run isort --check --profile black ./

_black_check:
	uv run black --check ./

_mypy:
	uv run mypy ./

lint:
	make -j _isort_check _black_check _mypy

_isort_apply:
	uv run isort --profile black ./

_black_apply:
	uv run black ./

fmt:
	make _isort_apply _black_apply

test:
	uv run pytest

dev:
	uv run uvicorn api.main:app --reload
