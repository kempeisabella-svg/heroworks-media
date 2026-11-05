set -e
B=$(cat .browser)
for p in props/*.json; do
  id=$(basename $p .json)
  npx remotion render src/index.jsx Reel out/$id.raw.mp4 --props=$p --browser-executable=$B --codec=h264 --crf=16 --muted --log=error --concurrency=2
  ffmpeg -y -loglevel error -i out/$id.raw.mp4 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -an -movflags +faststart out/$id.mp4
  rm out/$id.raw.mp4
  echo "done $id"
done
echo ALLDONE
