import json
import webbrowser
from pathlib import Path

JSON_PATH = Path("data/responses/songLinks.json")


def get_range():
    raw = input("Open which range? (example: 1-10 or 11-20): ").strip()
    try:
        start, end = raw.split("-")
        return int(start), int(end)
    except Exception:
        print("❌ Invalid format. Use: 1-10")
        exit(1)


def main():
    if not JSON_PATH.exists():
        print(f"❌ File not found: {JSON_PATH}")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    items = list(data.items())
    total = len(items)

    print(f"\nTotal songs: {total}")

    start, end = get_range()

    if start < 1 or end > total or start > end:
        print("❌ Invalid range.")
        return

    print(f"\n🚀 Opening songs {start} to {end} in browser...\n")

    for i in range(start - 1, end):
        song, info = items[i]
        url = info.get("Youtube_Url")
        artist = info.get("Artist", "UNKNOWN")

        print(f"[{i + 1}/{total}] 🎵 {song} - {artist}")
        webbrowser.open_new_tab(url)

    print("\n✅ All links opened.")


if __name__ == "__main__":
    main()
